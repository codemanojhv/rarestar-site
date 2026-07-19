"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RehaiIcon from "./RehaiIcon";

const links = [
  ["How It Works", "#how-it-works"],
  ["About Us", "#about-us"],
  ["Resources", "#technology"],
  ["For Therapists", "#for-therapists"]
];

export default function RehaiNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "rehai-nav rehai-nav--scrolled" : "rehai-nav"}>
      <div className="rehai-shell rehai-nav-inner">
        <a href="#top" className="rehai-brand" aria-label="Rehai home" onClick={() => setOpen(false)}>
          <span className="rehai-brand-mark"><Image src="/rehai/logo.png" alt="" width={38} height={38} className="brightness-0 invert" /></span>
          <span>REHAI</span>
        </a>
        <nav className={open ? "rehai-nav-links rehai-nav-links--open" : "rehai-nav-links"}>
          {links.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}{label === "Resources" ? <RehaiIcon name="chevron-down" size={13} /> : null}</a>)}
        </nav>
        <div className="rehai-nav-actions">
          <a className="rehai-button rehai-button--light rehai-nav-cta" href="#waitlist">Join Waitlist <RehaiIcon name="arrow" size={15} /></a>
          <button className="rehai-menu-button" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><RehaiIcon name="menu" size={23} /></button>
        </div>
      </div>
    </header>
  );
}
