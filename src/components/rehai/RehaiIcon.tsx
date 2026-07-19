import type { ReactNode } from "react";

export type RehaiIconName =
  | "person"
  | "cost"
  | "location"
  | "clock"
  | "sliders"
  | "waveform"
  | "mic"
  | "chart"
  | "brain"
  | "therapist"
  | "heart"
  | "speech"
  | "sparkles"
  | "globe"
  | "shield"
  | "science"
  | "users"
  | "check"
  | "arrow"
  | "chevron-down"
  | "plus"
  | "menu";

function IconShell({ children, size, title }: { children: ReactNode; size: number; title?: string }) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className="rehai-icon"
      fill="none"
      height={size}
      role={title ? "img" : undefined}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {children}
      </g>
    </svg>
  );
}

export default function RehaiIcon({ name, size = 24, title }: { name: RehaiIconName; size?: number; title?: string }) {
  switch (name) {
    case "person":
      return <IconShell size={size} title={title}><circle cx="12" cy="7" r="3" /><path d="M5.5 20c.8-3.5 3-5.2 6.5-5.2s5.7 1.7 6.5 5.2" /></IconShell>;
    case "cost":
      return <IconShell size={size} title={title}><circle cx="12" cy="12" r="8" /><path d="M14.5 8.8c-.6-.6-1.4-.9-2.4-.9-1.2 0-2.1.6-2.1 1.5 0 2.3 4.5 1 4.5 3.6 0 .9-.9 1.6-2.2 1.6-1 0-1.9-.3-2.6-1" /><path d="M12 6.8v10.4" /></IconShell>;
    case "location":
      return <IconShell size={size} title={title}><path d="M19 10.2c0 4.4-7 9.5-7 9.5s-7-5.1-7-9.5a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.1" /></IconShell>;
    case "clock":
      return <IconShell size={size} title={title}><circle cx="12" cy="12" r="8" /><path d="M12 7.5v4.9l3.2 1.8" /></IconShell>;
    case "sliders":
      return <IconShell size={size} title={title}><path d="M4 7h16M4 12h16M4 17h16" /><circle cx="9" cy="7" r="1.6" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.6" fill="currentColor" stroke="none" /><circle cx="11" cy="17" r="1.6" fill="currentColor" stroke="none" /></IconShell>;
    case "waveform":
      return <IconShell size={size} title={title}><path d="M4 12h2l1.5-4 2.2 8 2.1-11 2.2 14 1.8-7H20" /></IconShell>;
    case "mic":
      return <IconShell size={size} title={title}><rect x="8.5" y="4" width="7" height="10" rx="3.5" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" /></IconShell>;
    case "chart":
      return <IconShell size={size} title={title}><path d="M5 19V5M5 19h15" /><path d="M9 16v-4M13 16V8M17 16V5" /></IconShell>;
    case "brain":
      return <IconShell size={size} title={title}><path d="M11.8 5.2a3.1 3.1 0 0 0-5.7 1.7 3.3 3.3 0 0 0 .4 6.3 3.1 3.1 0 0 0 5.3 3.2M12.2 5.2a3.1 3.1 0 0 1 5.7 1.7 3.3 3.3 0 0 1-.4 6.3 3.1 3.1 0 0 1-5.3 3.2M12 5v14M8.5 9.5h3M12.5 13h3" /></IconShell>;
    case "therapist":
      return <IconShell size={size} title={title}><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.6-3.4 2.5-5.1 5.5-5.1s4.9 1.7 5.5 5.1M17 14.5l1.3 1.3 2.5-2.7" /></IconShell>;
    case "heart":
      return <IconShell size={size} title={title}><path d="M12 20s-7.2-4.3-8.5-9.1C2.5 7.2 5 4.5 8.1 4.5c1.8 0 3.1 1 3.9 2.1.8-1.1 2.1-2.1 3.9-2.1 3.1 0 5.6 2.7 4.6 6.4C19.2 15.7 12 20 12 20Z" /></IconShell>;
    case "speech":
      return <IconShell size={size} title={title}><path d="M5 6.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-8l-4.5 3v-3H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" /><path d="M8 12h.1M12 12h.1M16 12h.1" strokeWidth="2.4" /></IconShell>;
    case "sparkles":
      return <IconShell size={size} title={title}><path d="m12 3 1.3 5.7L19 10l-5.7 1.3L12 17l-1.3-5.7L5 10l5.7-1.3L12 3ZM19 15l.6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z" /></IconShell>;
    case "globe":
      return <IconShell size={size} title={title}><circle cx="12" cy="12" r="8" /><path d="M4.5 12h15M12 4c2.1 2.2 3.1 4.9 3.1 8s-1 5.8-3.1 8M12 4c-2.1 2.2-3.1 4.9-3.1 8s1 5.8 3.1 8" /></IconShell>;
    case "shield":
      return <IconShell size={size} title={title}><path d="M12 3.5 19 6v5.2c0 4.4-2.8 7.5-7 9.3-4.2-1.8-7-4.9-7-9.3V6l7-2.5Z" /><path d="m8.8 12 2.1 2.1 4.3-4.3" /></IconShell>;
    case "science":
      return <IconShell size={size} title={title}><path d="M9 3v5.5l-4.1 8.2A2.3 2.3 0 0 0 7 20h10a2.3 2.3 0 0 0 2.1-3.3L15 8.5V3M8 3h8M7.5 15h9" /></IconShell>;
    case "users":
      return <IconShell size={size} title={title}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.3" /><path d="M3.5 20c.5-3.5 2.4-5.2 5.5-5.2s5 1.7 5.5 5.2M15.2 14.6c2.9.1 4.6 1.8 5 4.4" /></IconShell>;
    case "check":
      return <IconShell size={size} title={title}><path d="m5 12.5 4.2 4.2L19 7" /></IconShell>;
    case "arrow":
      return <IconShell size={size} title={title}><path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" /></IconShell>;
    case "chevron-down":
      return <IconShell size={size} title={title}><path d="m6.5 9 5.5 5.5L17.5 9" /></IconShell>;
    case "plus":
      return <IconShell size={size} title={title}><path d="M12 5v14M5 12h14" /></IconShell>;
    case "menu":
      return <IconShell size={size} title={title}><path d="M4 8h16M4 16h16" /></IconShell>;
  }
}
