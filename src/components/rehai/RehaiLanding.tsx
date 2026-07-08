"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleGauge,
  Mic,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UsersRound,
  Volume2
} from "lucide-react";

const trustedLogos = ["LBS", "JEANS", "TAKKO", "vodafone"];

const process = [
  { n: "01", title: "Speak", desc: "Patient completes rehabilitation exercise", icon: Mic },
  { n: "02", title: "AI Understands", desc: "Speech and cognitive responses are captured digitally", icon: Volume2 },
  { n: "03", title: "Measures", desc: "AI generates clinical metrics and tracks performance", icon: BarChart3 },
  { n: "04", title: "Adapts", desc: "Adaptive engine recommends the next best task", icon: Sparkles },
  { n: "05", title: "Therapist Reviews", desc: "Therapist reviews progress and provides guidance", icon: UserRoundCheck },
  { n: "06", title: "Recovery Continues", desc: "Personalized therapy continues for better outcomes", icon: RefreshCw }
];

const benefits = [
  { title: "Daily Guided Sessions", desc: "Structured exercises that build consistency.", icon: CalendarDays },
  { title: "Objective Insights", desc: "Data-driven progress you can trust.", icon: BarChart3 },
  { title: "Safe & Secure", desc: "Enterprise-grade security and privacy.", icon: ShieldCheck },
  { title: "Better Outcomes", desc: "More engagement. Better recovery. Together.", icon: UsersRound }
];

const testimonials = [
  {
    quote: "Rehai keeps me motivated every day. The exercises are simple and really helpful.",
    name: "Larry, 62",
    avatar: "/rehai/patient_arjun.png"
  },
  {
    quote: "I can see real improvement in my speech and memory after using Rehai.",
    name: "Michael, 76",
    avatar: "/rehai/patient_arjun.png"
  },
  {
    quote: "As a therapist, Rehai helps me deliver smarter and more personalised care.",
    name: "Dr. Neha Sharma",
    role: "Speech Therapist",
    avatar: "/rehai/doctor_priya.png"
  }
];

const faq = [
  {
    q: "Does my insurance cover Rehai?",
    a: "Rehai is a digital therapeutic platform. Coverage depends on your provider. Please check with your insurance or contact us - we're happy to help."
  },
  { q: "Is Rehai easy to use?", a: "Yes. Sessions are guided, simple, and built for patients and caregivers." },
  { q: "Do I need a therapist to use Rehai?", a: "Rehai works best with therapist guidance, but daily practice can happen at home." },
  { q: "Is my data safe and private?", a: "Rehai is designed with secure clinical workflows and privacy-first data handling." }
];

function fade(delay = 0) {
  return {
    initial: { opacity: 1, y: 0 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const }
  };
}

function SectionTitle({
  title,
  subtitle
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div {...fade()} className="mx-auto mb-10 max-w-[640px] text-center">
      <h2 className="font-rehai-display text-[36px] leading-tight text-[#202237] md:text-[47px]">
        {title}
      </h2>
      <p className="mt-3 text-[13px] font-medium text-[#9aa0a4]">{subtitle}</p>
    </motion.div>
  );
}

export default function RehaiLanding() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const previous = document.documentElement.style.getPropertyValue("--grain-opacity");
    document.documentElement.style.setProperty("--grain-opacity", "0");
    return () => {
      document.documentElement.style.setProperty("--grain-opacity", previous || "0.035");
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fdfbf8] text-[#1c2235]">
      <section id="top" className="relative min-h-[700px] overflow-hidden px-5 pb-20 pt-[118px] md:min-h-[760px] md:px-6 md:pt-[132px]">
        <Image src="/rehai/hero-garden.png" alt="" fill priority loading="eager" sizes="100vw" className="scale-105 object-cover object-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.82),rgba(253,251,248,.2)_42%,rgba(253,251,248,.92)_78%),linear-gradient(180deg,rgba(253,251,248,.1)_0%,#fdfbf8_96%)]" />
        <div className="relative z-10 mx-auto max-w-[1120px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-6 inline-flex rounded-full border border-[#d8eeee] bg-white/55 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#77b9b7] shadow-[0_14px_45px_rgba(33,184,181,0.07)] backdrop-blur-md"
          >
            AI-powered neurological rehabilitation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mx-auto max-w-[780px] font-rehai-display text-[52px] leading-[1.02] text-[#202237] md:text-[72px]"
          >
            Recovery.
            <br />
            Made <span className="text-[#1caaa7]">Intelligent.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mx-auto mt-8 max-w-[470px] text-[19px] leading-[1.6] text-[#323848]"
          >
            AI-powered speech and cognitive rehabilitation that adapts to every patient's recovery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <a href="#waitlist" className="inline-flex items-center gap-4 rounded-full bg-[#23aaa6] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_22px_45px_rgba(35,170,166,.24)] transition-transform hover:scale-[1.03]">
              Join Waitlist <ChevronRight size={17} strokeWidth={3} />
            </a>
            <a href="#how-it-works" className="inline-flex items-center gap-4 rounded-full bg-white/90 px-8 py-4 text-[15px] font-semibold text-[#1c2235] shadow-[0_22px_55px_rgba(28,34,53,.08)] transition-transform hover:scale-[1.03]">
              See How It Works <ChevronRight size={16} fill="#1c2235" strokeWidth={2.6} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="mx-auto mt-20 max-w-[640px] md:mt-[148px]"
          >
            <p className="mb-6 text-[12px] font-medium text-[#b1b5b6]">Trusted by rehabilitation professionals</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[16px] font-bold tracking-tight text-[#2a3039]/38 grayscale md:gap-x-16 md:text-[18px]">
              {trustedLogos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="px-6 pb-16 pt-10">
        <div className="mx-auto max-w-[1120px]">
          <SectionTitle title="Here's How It Works" subtitle="Intelligent. Adaptive. Therapist-guided." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {process.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.n} {...fade(i * 0.04)} className="relative">
                  <div className="min-h-[250px] rounded-[18px] border border-white bg-white/88 p-6 text-center shadow-[0_24px_70px_rgba(33,184,181,0.08)] transition-transform hover:-translate-y-1">
                    <div className="mx-auto mb-9 flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f8f6] text-[13px] font-bold text-[#9ccfcd]">
                      {item.n}
                    </div>
                    <Icon className="mx-auto mb-7 text-[#20aaa6]" size={30} strokeWidth={2.1} />
                    <h3 className="text-[15px] font-bold text-[#1f2537]">{item.title}</h3>
                    <p className="mx-auto mt-4 max-w-[120px] text-[11px] leading-[1.55] text-[#8f969d]">{item.desc}</p>
                  </div>
                  {i < process.length - 1 && (
                    <ChevronRight className="absolute right-[-18px] top-1/2 z-10 hidden -translate-y-1/2 text-[#9ad6d4] md:block" size={15} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="technology" className="px-6 py-8">
        <div className="mx-auto grid max-w-[1120px] gap-5 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.05fr_.78fr]">
          <motion.article {...fade()} className="overflow-hidden rounded-[18px] border border-white bg-white shadow-[0_25px_80px_rgba(28,34,53,.08)]">
            <div className="relative h-[235px]">
              <Image src="/rehai/therapy_session.png" alt="Patient using Rehai tablet" fill sizes="(min-width: 768px) 310px, 100vw" className="object-cover object-[45%_35%]" />
            </div>
            <div className="p-7">
              <h3 className="text-[16px] font-bold">Designed for Real Recovery</h3>
              <p className="mt-5 max-w-[245px] text-[13px] leading-[1.65] text-[#72767e]">
                Evidence-based exercises for speech, cognition, attention and memory.
              </p>
              <div className="mt-6 flex items-center justify-between text-[#23aaa6]">
                <span className="flex gap-3"><Sparkles size={14} /><CircleGauge size={14} /></span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(28,34,53,.08)]">
                  <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </motion.article>

          <motion.article {...fade(0.05)} className="relative min-h-[385px] overflow-hidden rounded-[18px] border border-white bg-[#e4f8f7] p-7 shadow-[0_25px_80px_rgba(28,34,53,.06)]">
            <h3 className="relative z-10 text-[16px] font-bold">Adaptive for Every Patient</h3>
            <p className="relative z-10 mt-5 max-w-[220px] text-[13px] leading-[1.65] text-[#72767e]">
              AI personalizes difficulty and recommends what works best for each individual.
            </p>
            <Image src="/rehai/chart-waves.png" alt="Adaptive recovery chart" fill sizes="(min-width: 768px) 270px, 100vw" className="z-0 object-cover object-bottom opacity-95" />
          </motion.article>

          <motion.article {...fade(0.1)} className="overflow-hidden rounded-[18px] border border-white bg-white p-7 shadow-[0_25px_80px_rgba(28,34,53,.08)]">
            <h3 className="text-[16px] font-bold">Therapist-Guided Care</h3>
            <p className="mt-5 max-w-[235px] text-[13px] leading-[1.65] text-[#545b63]">
              AI assists. Therapists decide. Ensuring safe, effective and ethical rehabilitation.
            </p>
            <div className="mt-7 relative h-[174px] overflow-hidden rounded-[10px]">
              <Image src="/rehai/doctor_priya.png" alt="Therapist consultation" fill sizes="(min-width: 768px) 270px, 100vw" className="object-cover object-[50%_28%]" />
            </div>
          </motion.article>

          <motion.article {...fade(0.15)} className="relative min-h-[385px] overflow-hidden rounded-[18px] bg-[#21aaa7] p-7 text-white shadow-[0_25px_80px_rgba(33,184,181,.22)]">
            <h3 className="text-[17px] font-bold leading-tight">Track What Matters</h3>
            <p className="mt-5 text-[13px] leading-[1.65] text-white/92">Objective metrics that show real improvement over time.</p>
            <div className="absolute bottom-10 left-1/2 flex h-[150px] w-[150px] -translate-x-1/2 items-center justify-center rounded-full border-[15px] border-white/25">
              <div className="absolute inset-[-15px] rounded-full border-[15px] border-transparent border-t-white/70 border-r-white/70" />
              <div className="text-center">
                <p className="text-[38px] font-semibold">92%</p>
                <p className="text-[12px] font-semibold leading-tight">Improvement<br />This Week</p>
              </div>
            </div>
          </motion.article>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1120px] gap-5 md:grid-cols-2">
          <motion.div {...fade()} className="relative min-h-[300px] overflow-hidden rounded-[14px] bg-[#ddf6f5] p-10">
            <h3 className="mb-8 text-[17px] font-bold">We Support</h3>
            <ul className="space-y-5 text-[14px] font-semibold">
              {["Stroke", "Aphasia", "Traumatic Brain Injury", "Cognitive Impairment", "Other Neurological Conditions"].map((item, i) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c7efec] text-[11px] text-[#22aaa7]">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
            <Image src="/rehai/floral-panel.png" alt="" width={360} height={170} className="absolute bottom-0 right-0 w-[45%] opacity-85" />
          </motion.div>

          <motion.div {...fade(0.08)} className="relative min-h-[300px] overflow-hidden rounded-[14px] bg-[#def6f5] p-10">
            <h3 className="relative z-10 text-[17px] font-bold">Built for Impact</h3>
            <p className="relative z-10 mt-8 max-w-[250px] text-[18px] leading-[1.45] text-[#202237]">
              Making quality rehabilitation accessible to more people, everywhere.
            </p>
            <button className="relative z-10 mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#23aaa6] shadow-[0_18px_45px_rgba(28,34,53,.08)]">
              <ChevronRight size={19} />
            </button>
            <Image src="/rehai/ripple-panel.png" alt="" fill sizes="(min-width: 768px) 540px, 100vw" className="z-0 object-cover object-right opacity-90" />
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1120px]">
          <SectionTitle title="Real People. Real Progress." subtitle="AI-powered care that patients trust and therapists rely on." />
          <div className="grid gap-5 md:grid-cols-4">
            {benefits.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} {...fade(i * 0.05)} className="rounded-[14px] bg-white px-8 py-10 text-center shadow-[0_24px_75px_rgba(28,34,53,.06)]">
                  <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#ecf9f7] text-[#23aaa6]">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[15px] font-bold">{item.title}</h3>
                  <p className="mt-4 text-[12px] leading-[1.6] text-[#72767e]">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="for-therapists" className="px-6 pb-16">
        <div className="mx-auto max-w-[1120px]">
          <SectionTitle title="Trusted by Patients and Therapists" subtitle="" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.article key={item.name} {...fade(i * 0.05)} className="rounded-[14px] bg-white p-8 shadow-[0_24px_75px_rgba(28,34,53,.06)]">
                <div className="mb-5 text-[34px] font-serif leading-none text-[#86c9c7]">&ldquo;</div>
                <p className="min-h-[88px] text-[15px] italic leading-[1.55] text-[#39404b]">{item.quote}</p>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={item.avatar} alt={item.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <p className="text-[13px] font-semibold">{item.name}</p>
                      {item.role && <p className="text-[10px] text-[#8b9096]">{item.role}</p>}
                    </div>
                  </div>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#23aaa6] text-[#23aaa6]">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2, 3].map((dot) => (
              <span key={dot} className={`h-2 w-2 rounded-full ${dot === 0 ? "bg-[#23aaa6]" : "bg-[#d9e4e3]"}`} />
            ))}
          </div>
        </div>
      </section>

      <section id="about-us" className="px-6 pb-16">
        <div className="mx-auto max-w-[1090px]">
          <SectionTitle title="Your Questions Answered" subtitle="Everything you need to know about Rehai." />
          <div className="grid gap-6 md:grid-cols-[1.28fr_.95fr]">
            <div className="space-y-4">
              {faq.map((item, i) => (
                <motion.div key={item.q} {...fade(i * 0.04)} className="overflow-hidden rounded-[12px] bg-white shadow-[0_20px_60px_rgba(28,34,53,.06)]">
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between px-8 py-5 text-left text-[15px] font-semibold">
                    {item.q}
                    <ChevronDown className={`text-[#418683] transition-transform ${openFaq === i ? "rotate-180" : ""}`} size={18} />
                  </button>
                  {openFaq === i && <p className="px-8 pb-7 text-[13px] leading-[1.7] text-[#8b9096]">{item.a}</p>}
                </motion.div>
              ))}
            </div>
            <motion.div {...fade(0.08)} className="relative min-h-[300px] overflow-hidden rounded-[14px]">
              <Image src="/rehai/floral-panel.png" alt="Soft flowers and bird" fill sizes="(min-width: 768px) 460px, 100vw" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="px-6 pb-14">
        <motion.div {...fade()} className="relative mx-auto flex min-h-[245px] max-w-[1090px] items-center justify-center overflow-hidden rounded-[14px]">
          <Image src="/rehai/hero-garden.png" alt="" fill sizes="(min-width: 768px) 1090px, 100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-white/15" />
          <div className="relative z-10 text-center">
            <h2 className="font-rehai-display text-[41px] leading-tight text-[#202237]">We're Here When You Need Us.</h2>
            <p className="mt-4 text-[15px] text-[#59606a]">Take the first step towards confident recovery.</p>
            <a href="mailto:hello@rarestar.studio" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#23aaa6] px-7 py-4 text-[13px] font-semibold text-white shadow-[0_18px_40px_rgba(35,170,166,.23)]">
              Join Waitlist <ChevronRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
