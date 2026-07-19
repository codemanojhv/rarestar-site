"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RehaiIcon from "./RehaiIcon";

gsap.registerPlugin(ScrollTrigger);

const links = [
  ["How It Works", "#how-it-works"],
  ["Technology", "#technology"],
  ["For Therapists", "#for-therapists"],
  ["About Us", "#about-us"]
];

const backgroundVertex = `
  varying vec2 v_uv;

  void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const backgroundFragment = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_active;
  varying vec2 v_uv;

  void main() {
    vec2 aspect = vec2(u_resolution.x / max(1.0, u_resolution.y), 1.0);
    vec2 pointer = (v_uv - u_pointer) * aspect;
    float distanceToPointer = length(pointer);
    float halo = exp(-distanceToPointer * 3.2) * u_active;
    float current = sin(v_uv.x * 8.0 + v_uv.y * 4.0 - u_time * 0.14) * 0.015;
    float heightMix = smoothstep(0.0, 1.0, v_uv.y);
    vec3 midnight = vec3(0.015, 0.035, 0.11);
    vec3 cobalt = vec3(0.04, 0.13, 0.34);
    vec3 sky = mix(midnight, cobalt, heightMix * 0.86);
    sky += vec3(0.8, 0.22, 0.34) * halo * 0.1;
    sky += vec3(0.18, 0.36, 0.72) * current;
    gl_FragColor = vec4(max(sky, vec3(0.0)), 1.0);
  }
`;

const particleVertex = `
  uniform float u_time;
  uniform vec2 u_pointer;
  uniform float u_active;
  attribute float a_size;
  attribute float a_phase;
  attribute float a_depth;
  varying float v_alpha;

  void main() {
    vec3 point = position;
    float t = u_time * 0.12 + a_phase;
    point.x += sin(t + point.y * 3.7) * 0.07;
    point.y += cos(t * 0.82 + point.x * 4.2) * 0.06;

    vec2 pointer = vec2(u_pointer.x * 2.0 - 1.0, u_pointer.y * 2.0 - 1.0);
    vec2 distanceVector = point.xy - pointer;
    float distanceToPointer = length(distanceVector);
    point.xy += normalize(distanceVector + vec2(0.001)) * exp(-distanceToPointer * 4.2) * 0.13 * u_active;

    vec4 modelPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * modelPosition;
    gl_PointSize = (a_size + a_depth * 3.0) * (280.0 / max(1.0, -modelPosition.z));
    v_alpha = 0.22 + a_depth * 0.45;
  }
`;

const particleFragment = `
  precision highp float;
  varying float v_alpha;

  void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, distanceToCenter);
    vec3 color = mix(vec3(0.45, 0.68, 1.0), vec3(1.0, 0.48, 0.58), glow * 0.72);
    gl_FragColor = vec4(color, glow * v_alpha);
  }
`;

function seeded(index: number, offset: number) {
  return (Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453) % 1;
}

function createParticleGeometry() {
  const count = 150;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const depths = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const x = seeded(index, 0.2) * 2.2;
    const y = seeded(index, 0.7) * 1.65;
    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = seeded(index, 1.1) * 0.35;
    sizes[index] = 2.5 + Math.abs(seeded(index, 1.7)) * 7;
    phases[index] = Math.abs(seeded(index, 2.3)) * 12;
    depths[index] = Math.abs(seeded(index, 2.9));
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("a_size", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("a_phase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("a_depth", new THREE.BufferAttribute(depths, 1));
  return geometry;
}

export default function RehaiFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    renderer.setClearColor(0x071536, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;
    const pointer = new THREE.Vector2(0.5, 0.52);
    const targetPointer = new THREE.Vector2(0.5, 0.52);
    const pointerActive = { value: 0.3 };
    const targetActive = { value: 0.3 };
    const clock = new THREE.Clock();

    const backgroundMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_pointer: { value: pointer },
        u_active: { value: pointerActive.value }
      },
      vertexShader: backgroundVertex,
      fragmentShader: backgroundFragment
    });
    const background = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backgroundMaterial);
    scene.add(background);

    const particleGeometry = createParticleGeometry();
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_pointer: { value: pointer },
        u_active: { value: pointerActive.value }
      },
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(rect.width, rect.height, false);
      backgroundMaterial.uniforms.u_resolution.value.set(rect.width, rect.height);
    };
    const move = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      targetPointer.set(
        Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
        1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
      );
      targetActive.value = 1;
    };
    const enter = () => { targetActive.value = 1; };
    const leave = () => { targetActive.value = 0.3; targetPointer.set(0.5, 0.52); };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;

    const render = () => {
      pointer.lerp(targetPointer, 0.065);
      pointerActive.value += (targetActive.value - pointerActive.value) * 0.08;
      const time = reducedMotion ? 0 : clock.getElapsedTime();
      backgroundMaterial.uniforms.u_time.value = time;
      backgroundMaterial.uniforms.u_active.value = pointerActive.value;
      particleMaterial.uniforms.u_time.value = time;
      particleMaterial.uniforms.u_active.value = pointerActive.value;
      renderer.render(scene, camera);
    };

    resize();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerenter", enter);
    stage.addEventListener("pointerleave", leave);
    if (reducedMotion) {
      render();
    } else {
      const loop = () => {
        render();
        frame = window.requestAnimationFrame(loop);
      };
      frame = window.requestAnimationFrame(loop);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerenter", enter);
      stage.removeEventListener("pointerleave", leave);
      background.geometry.dispose();
      backgroundMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".rehai-footer-stage",
        { yPercent: 7, clipPath: "inset(9% 3% 0% round 26px)" },
        {
          yPercent: 0,
          clipPath: "inset(0% 0% 0% round 0px)",
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top bottom", end: "top 62%", scrub: 1 }
        }
      );
      gsap.from(".rehai-footer-kicker, .rehai-footer-intro h2, .rehai-footer-intro-copy, .rehai-footer-cta", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 76%", once: true }
      });
      gsap.from(".rehai-footer-letter", {
        yPercent: 16,
        opacity: 0.18,
        duration: 1.1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 74%", once: true }
      });
      gsap.from(".rehai-footer-content > *", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 52%", once: true }
      });
    }, footerRef);

    const letters = Array.from(footerRef.current?.querySelectorAll<HTMLElement>(".rehai-footer-letter") || []);
    const quickMoves = letters.map((letter) => ({
      x: gsap.quickTo(letter, "x", { duration: 0.42, ease: "power3.out" }),
      y: gsap.quickTo(letter, "y", { duration: 0.42, ease: "power3.out" }),
      rotate: gsap.quickTo(letter, "rotate", { duration: 0.42, ease: "power3.out" })
    }));
    const onMove = (event: PointerEvent) => {
      letters.forEach((letter, index) => {
        const rect = letter.getBoundingClientRect();
        const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
        const influence = Math.max(0, 1 - distance / 260);
        quickMoves[index].x((event.clientX - (rect.left + rect.width / 2)) * influence * 0.045);
        quickMoves[index].y(-influence * 12);
        quickMoves[index].rotate((event.clientX < rect.left + rect.width / 2 ? -1 : 1) * influence * 2.2);
      });
    };
    const resetLetters = () => quickMoves.forEach((move) => { move.x(0); move.y(0); move.rotate(0); });
    footerRef.current?.addEventListener("pointermove", onMove);
    footerRef.current?.addEventListener("pointerleave", resetLetters);

    return () => {
      footerRef.current?.removeEventListener("pointermove", onMove);
      footerRef.current?.removeEventListener("pointerleave", resetLetters);
      context.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="rehai-footer">
      <div ref={stageRef} className="rehai-footer-stage">
        <canvas ref={canvasRef} className="rehai-footer-webgl" aria-hidden="true" />
        <Image src="/rehai/blossom-branch.png" alt="" fill sizes="100vw" className="rehai-footer-branch" aria-hidden="true" />
        <div className="rehai-shell rehai-footer-stage-inner">
          <div className="rehai-footer-intro">
            <p className="rehai-footer-kicker">REHAI / THE NEXT CHAPTER</p>
            <h2>Recovery,<br /><em>in bloom.</em></h2>
            <p className="rehai-footer-intro-copy">Keep moving toward the moments that matter.</p>
            <a className="rehai-footer-cta" href="#waitlist">Join the early access list <RehaiIcon name="arrow" size={15} /></a>
          </div>
          <div className="rehai-footer-word" aria-label="REHAI" role="img">
            {[..."REHAI"].map((letter, index) => <span className="rehai-footer-letter" key={`${letter}-${index}`}>{letter}</span>)}
          </div>
          <div className="rehai-footer-content">
            <a href="#top" className="rehai-footer-brand" aria-label="Rehai home">
              <span className="rehai-footer-mark"><Image src="/rehai/logo.png" alt="" width={24} height={24} /></span>
              <span>REHAI</span>
            </a>
            <nav className="rehai-footer-links" aria-label="Footer navigation">
              {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            </nav>
            <a className="rehai-footer-top" href="#top">Back to top <RehaiIcon name="arrow" size={15} /></a>
            <p className="rehai-footer-legal">(c) Rehai 2026. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
