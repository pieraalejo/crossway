/* global React, lucide */
const { useEffect, useState, useRef } = React;

// Lucide icon helper
function Icon({ name, size = 16, stroke = 1.5, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = "";
      const i = document.createElement("i");
      i.setAttribute("data-lucide", name);
      ref.current.appendChild(i);
      window.lucide.createIcons({ attrs: { width: size, height: size, "stroke-width": stroke } });
    }
  }, [name, size, stroke]);
  return <span ref={ref} className={className} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size, lineHeight: 0, ...style }} />;
}

function Eyebrow({ children, style, color }) {
  return <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: color || "var(--fg-2)", fontWeight: 500, fontFamily: "var(--font-sans)", ...style }}>{children}</span>;
}

function Badge({ children, tone = "lime", size = "md" }) {
  const tones = {
    lime: { background: "var(--accent-tint-md)", color: "var(--neon-lime)", boxShadow: "inset 0 0 0 1px var(--accent-tint-edge)" },
    yale: { background: "var(--info-tint-sm)", color: "var(--info-fg)", boxShadow: "inset 0 0 0 1px var(--info-tint-edge-strong)" },
    neutral: { background: "var(--bg-2)", color: "var(--fg-2)", boxShadow: "inset 0 0 0 1px var(--hairline-strong)" },
    success: { background: "var(--success-tint-md)", color: "var(--success-fg)", boxShadow: "inset 0 0 0 1px var(--success-tint-edge)" },
  };
  const sizes = {
    sm: { fontSize: 10, padding: "3px 7px", gap: 4 },
    md: { fontSize: 11, padding: "5px 9px", gap: 6 },
  };
  return <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: 999, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", ...sizes[size], ...tones[tone] }}>{children}</span>;
}

function VerifiedBadge({ size = "md" }) {
  return (
    <span title="Verified student · .edu email" style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size === "sm" ? 10 : 11,
      letterSpacing: "0.08em", textTransform: "uppercase",
      color: "var(--neon-lime)",
      padding: size === "sm" ? "3px 7px 3px 6px" : "4px 9px 4px 7px",
      borderRadius: 999,
      background: "var(--accent-tint-sm)",
      boxShadow: "inset 0 0 0 1px var(--accent-tint-edge)",
    }}>
      <svg width={size === "sm" ? 10 : 12} height={size === "sm" ? 10 : 12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 14.5 4.5 18 4 18.5 7.5 21.5 9.5 20 13 21.5 16.5 18.5 18.5 18 22 14.5 21.5 12 24 9.5 21.5 6 22 5.5 18.5 2.5 16.5 4 13 2.5 9.5 5.5 7.5 6 4 9.5 4.5 12 2Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      Verified Student
    </span>
  );
}

function Btn({ variant = "primary", size = "md", icon, iconRight, children, onClick, disabled, full, type, style }) {
  const sizes = {
    xs: { padding: "6px 10px", fontSize: 11, gap: 6, height: 28 },
    sm: { padding: "8px 14px", fontSize: 12, gap: 6, height: 34 },
    md: { padding: "11px 18px", fontSize: 13, gap: 8, height: 42 },
    lg: { padding: "14px 22px", fontSize: 14, gap: 10, height: 50 },
  };
  const variants = {
    primary: { background: "var(--neon-lime)", color: "var(--carbon-black)" },
    secondary: { background: "transparent", color: "var(--bone-white)", boxShadow: "inset 0 0 0 1px var(--hairline-strong)" },
    ghost: { background: "transparent", color: "var(--bone-white)" },
    yale: { background: "var(--yale-blue)", color: "var(--bone-white)" },
    danger: { background: "transparent", color: "#e07a7a", boxShadow: "inset 0 0 0 1px rgba(224,122,122,0.4)" },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={{
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      border: 0, fontFamily: "var(--font-sans)", fontWeight: 600,
      borderRadius: 6, transition: "all 120ms cubic-bezier(0.2,0.7,0.2,1)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      letterSpacing: "-0.005em", textDecoration: "none",
      width: full ? "100%" : "auto",
      ...sizes[size], ...variants[variant], ...style,
    }}>
      {icon && <Icon name={icon} size={size === "lg" ? 18 : 14} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "lg" ? 18 : 14} />}
    </button>
  );
}

function Stars({ value, size = 12, color = "var(--neon-lime)" }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color, lineHeight: 0 }}>
      {[1,2,3,4,5].map(n => {
        const fill = value >= n ? 1 : value >= n - 0.5 ? 0.5 : 0;
        return (
          <svg key={n} width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
            <defs>
              <linearGradient id={`g${n}-${value}-${size}`}>
                <stop offset={`${fill * 100}%`} stopColor={color} />
                <stop offset={`${fill * 100}%`} stopColor="rgba(168,168,168,0.35)" />
              </linearGradient>
            </defs>
            <path fill={`url(#g${n}-${value}-${size})`} d="M12 2l2.95 6.36 6.85.65-5.18 4.74L18.18 21 12 17.27 5.82 21l1.56-7.25L2.2 9.01l6.85-.65L12 2z" />
          </svg>
        );
      })}
    </span>
  );
}

function HoverLift({ children, style, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}
      style={{
        transition: "background 220ms var(--ease-out), border-color 220ms var(--ease-out), transform 220ms var(--ease-out)",
        background: hover ? "var(--bg-2)" : "var(--bg-1)",
        border: `1px solid ${hover ? "var(--hairline-strong)" : "var(--hairline)"}`,
        borderRadius: 12,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}>
      {children}
    </div>
  );
}

function useMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return mobile;
}

Object.assign(window, { Icon, Eyebrow, Badge, VerifiedBadge, Btn, Stars, HoverLift, useMobile });
