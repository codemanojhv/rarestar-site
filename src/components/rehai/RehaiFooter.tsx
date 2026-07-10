import Image from "next/image";

const links = ["How It Works", "Technology", "For Therapists", "About Us"];

export default function RehaiFooter() {
  return (
    <footer className="bg-[#fdfbf8] px-6 pb-8 pt-2 text-[#1c2235]">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-8 border-t border-[#eef2ef] pt-8 md:flex-row">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#23aaa6]">
            <Image src="/rehai/logo.png" alt="" width={24} height={24} className="h-6 w-6 object-contain brightness-0 invert" />
          </span>
          <span className="text-[31px] font-semibold tracking-[0.02em]">REHAI</span>
        </a>

        <p className="text-[12px] text-[#969da2]">© Rehai 2026. All rights reserved.</p>

        <nav className="flex flex-wrap items-center justify-center gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} className="text-[12px] font-medium text-[#1c2235]">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
