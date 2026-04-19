"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGL-treated hero video.
 * Renders the looping hero video onto a full-bleed quad with a fragment shader
 * that applies:
 *  - animated film grain
 *  - subtle RGB channel split (chromatic aberration) that breathes
 *  - vignette
 *  - a soft scanline wobble on the luma
 *  - lift/gamma tuning so black levels sit rich without crushing highlights
 *
 * The raw <video> element is hidden but kept in the DOM so autoplay + loop +
 * muted behave reliably across browsers.
 */
export default function HeroVideo() {
  const mountRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const video = videoRef.current;
    if (!mount || !video) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    const uniforms = {
      uTex: { value: videoTexture },
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uVidRes: { value: new THREE.Vector2(1920, 1080) },
      uGrain: { value: 0.12 },
      uAberration: { value: 0.0018 },
      uVignette: { value: 0.55 },
      uIntro: { value: 0.0 } // 0 → 1 reveal, animated by GSAP
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uTex;
        uniform float uTime;
        uniform vec2 uRes;
        uniform vec2 uVidRes;
        uniform float uGrain;
        uniform float uAberration;
        uniform float uVignette;
        uniform float uIntro;

        // hash / noise
        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        // cover behavior — fill canvas without distortion
        vec2 coverUv(vec2 uv, vec2 canvas, vec2 tex) {
          float canvasA = canvas.x / canvas.y;
          float texA = tex.x / tex.y;
          vec2 s = vec2(1.0);
          if (canvasA > texA) {
            s.y = texA / canvasA;
          } else {
            s.x = canvasA / texA;
          }
          return (uv - 0.5) * s + 0.5;
        }

        void main() {
          vec2 uv = coverUv(vUv, uRes, uVidRes);

          // vertical intro wipe + slight scale bloom
          float introMask = smoothstep(0.0, 1.0, uIntro);
          float scale = mix(1.08, 1.0, introMask);
          uv = (uv - 0.5) / scale + 0.5;

          // chromatic aberration that breathes
          float ab = uAberration * (0.7 + 0.3 * sin(uTime * 0.6));
          vec2 dir = normalize(uv - 0.5 + 1e-6);
          float r = texture2D(uTex, uv + dir * ab).r;
          float g = texture2D(uTex, uv).g;
          float b = texture2D(uTex, uv - dir * ab).b;
          vec3 col = vec3(r, g, b);

          // film grain
          float n = hash(vUv * uRes.xy + uTime * 60.0);
          col += (n - 0.5) * uGrain;

          // scanline wobble on luma
          float scan = 0.04 * sin(vUv.y * uRes.y * 1.8 + uTime * 2.0);
          col *= 1.0 + scan * 0.12;

          // mild contrast lift
          col = pow(col, vec3(0.95));
          col = (col - 0.5) * 1.04 + 0.5;

          // vignette
          float d = distance(vUv, vec2(0.5));
          float vig = smoothstep(0.85, 0.25, d);
          col *= mix(1.0, vig, uVignette);

          // intro curtain — rise from bottom
          float curtain = smoothstep(1.0 - uIntro, 1.0 - uIntro + 0.18, 1.0 - vUv.y);
          col *= curtain;

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });

    const geom = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);

    let rafId = 0;
    const clock = new THREE.Clock();

    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!mount) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      uniforms.uRes.value.set(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const handleMeta = () => {
      if (video.videoWidth && video.videoHeight) {
        uniforms.uVidRes.value.set(video.videoWidth, video.videoHeight);
      }
    };
    video.addEventListener("loadedmetadata", handleMeta);

    // autoplay guard — browsers require interaction sometimes; muted+playsinline covers most
    video.volume = 0; // start silent; SoundDesign toggle fades in the breeze audio
    const tryPlay = () => {
      void video.play().catch(() => {
        // wait for first user interaction
        const once = () => {
          void video.play();
          window.removeEventListener("pointerdown", once);
          window.removeEventListener("touchstart", once);
        };
        window.addEventListener("pointerdown", once, { once: true });
        window.addEventListener("touchstart", once, { once: true });
      });
    };
    tryPlay();

    render();

    // GSAP-driven intro reveal — imported lazily so SSR is happy
    let introTween: { kill: () => void } | null = null;
    import("gsap").then(({ gsap }) => {
      introTween = gsap.to(uniforms.uIntro, {
        value: 1,
        duration: 1.6,
        ease: "power3.out",
        delay: 0.1
      });
    });

    // ── Breeze audio from the hero video ─────────────────────────────
    // Plays at full volume when BOTH conditions are true:
    //   1. Sound toggle is enabled (rarestar:sound event)
    //   2. Hero section is in the viewport (IntersectionObserver)
    // Smoothly fades in/out on either condition change.

    const TARGET_VOL = 1.0;         // max volume when active
    const FADE_MS    = 500;
    const FADE_STEP  = 16;          // ~60 fps

    let soundEnabled = false;
    let heroVisible  = true;        // starts visible (hero is first section)
    let fadeTimer: ReturnType<typeof setInterval> | null = null;

    const fadeVolume = (target: number) => {
      if (fadeTimer) clearInterval(fadeTimer);
      const steps = Math.ceil(FADE_MS / FADE_STEP);
      const delta = (target - video.volume) / steps;
      let step = 0;

      fadeTimer = setInterval(() => {
        step++;
        video.volume = Math.max(0, Math.min(1, video.volume + delta));
        if (step >= steps) {
          video.volume = target;
          if (fadeTimer) clearInterval(fadeTimer);
          fadeTimer = null;
          if (target === 0) video.muted = true;
        }
      }, FADE_STEP);
    };

    const syncAudio = () => {
      if (soundEnabled && heroVisible) {
        video.muted = false;
        fadeVolume(TARGET_VOL);
      } else {
        fadeVolume(0);
      }
    };

    // Listen for sound toggle
    const onSoundToggle = (e: Event) => {
      soundEnabled = (e as CustomEvent<{ enabled: boolean }>).detail.enabled;
      syncAudio();
    };
    window.addEventListener("rarestar:sound", onSoundToggle);

    // Observe hero section visibility
    const heroSection = mount.closest("[id='top']") || mount.parentElement;
    let heroObserver: IntersectionObserver | null = null;

    if (heroSection) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          heroVisible = entry.isIntersecting;
          syncAudio();
        },
        { threshold: 0.15 }          // ~15% visible = "in view"
      );
      heroObserver.observe(heroSection);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("loadedmetadata", handleMeta);
      window.removeEventListener("rarestar:sound", onSoundToggle);
      heroObserver?.disconnect();
      if (fadeTimer) clearInterval(fadeTimer);
      introTween?.kill();
      renderer.dispose();
      geom.dispose();
      material.dispose();
      videoTexture.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Instant paint: poster image behind the WebGL canvas. Visible during
          the ~200–800ms before the video has decoded enough frames for the
          shader to kick in. Same crop as the video so there is no pop. */}
      <div
        aria-label="Rarestar Cinematic Showreel"
        role="img"
        className="absolute inset-0 h-full w-full bg-ink"
        style={{
          backgroundImage: "url('/hero-poster.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <video
        ref={videoRef}
        className="pointer-events-none absolute h-px w-px opacity-0"
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
      />
    </>
  );
}
