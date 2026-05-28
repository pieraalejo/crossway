/* global React, ReactDOM, lucide,
  Icon, Eyebrow, Badge, VerifiedBadge, Btn, Stars, HoverLift,
  Hero, Marketplace, Services, Events, ViewHeader,
  ChatOverlay, ItemDrawer, PostAdModal,
  CAMPUSES */
const { useState, useEffect, useRef } = React;

const ACCENT_HEX = {
  lime:    "#e9fc79",
  emerald: "#7fe5a3",
  blue:    "#7da3d4",
  bone:    "#f3f4ed",
};
const ACCENT = window.__CW_ACCENT__ || ACCENT_HEX.lime;
const SHOW_FAB = true;
const DEFAULT_CAMPUS = "esb-reutlingen";

function App() {
  const accent = ACCENT;

  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState(DEFAULT_CAMPUS);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState(null);
  const [item, setItem] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const [attending, setAttending] = useState(new Set(["e3"]));
  const [notif, setNotif] = useState(null);

  const openChat = (target) => { setChatTarget(target); setChatOpen(true); };
  const toggleAttend = (id) => {
    setAttending(s => {
      const ns = new Set(s);
      if (ns.has(id)) ns.delete(id); else ns.add(id);
      setNotif(ns.has(id) ? "Confirmed · reminder 1h before" : "Reservation cancelled");
      setTimeout(() => setNotif(null), 2400);
      return ns;
    });
  };

  return (
    <div className="modulo-type" style={{ minHeight: "100vh", "--accent-dyn": accent }}>
      <Navbar tab={tab} setTab={setTab} accent={accent} onChat={() => setChatOpen(true)} />

      {tab === "home" && (
        <>
          <Hero campus={campus} setCampus={setCampus} accent={accent}
            onTab={(t) => setTab(t)} onSearch={() => {}} query={query} setQuery={setQuery} />
          <FeaturedSections accent={accent} setTab={setTab} onChat={openChat} onItem={setItem} attending={attending} onAttend={toggleAttend} />
        </>
      )}
      {tab === "marketplace" && <Marketplace query={query} onChat={openChat} onItem={setItem} accent={accent} />}
      {tab === "services" && <Services query={query} onChat={openChat} accent={accent} />}
      {tab === "events" && <Events query={query} accent={accent} onAttend={toggleAttend} attending={attending} />}

      <Footer accent={accent} campus={campus} />

      {SHOW_FAB && <FAB onClick={() => setPostOpen(true)} accent={accent} />}

      <ChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} initial={chatTarget} accent={accent} />
      <ItemDrawer item={item} onClose={() => setItem(null)} onChat={openChat} accent={accent} />
      <PostAdModal open={postOpen} onClose={() => setPostOpen(false)} accent={accent} />

      {notif && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          background: "var(--bg-1)", border: "1px solid var(--hairline-strong)", borderRadius: 10,
          padding: "12px 18px", color: "var(--fg-1)", fontSize: 13, zIndex: 200,
          boxShadow: "var(--shadow-md)", display: "inline-flex", alignItems: "center", gap: 10,
          animation: "cwslideup 220ms var(--ease-out)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />
          {notif}
        </div>
      )}
    </div>
  );
}

// ─── BRAND MARK ────────────────────────────────────────────────
function CrosswayMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-label="Crossway" role="img" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`cw-blue-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#075EDB" />
          <stop offset="100%" stopColor="#003F9E" />
        </linearGradient>
        <linearGradient id={`cw-teal-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00CDBA" />
          <stop offset="100%" stopColor="#00B9A9" />
        </linearGradient>
      </defs>
      <g transform="rotate(45 100 100)">
        <rect x="14" y="82" width="172" height="36" rx="18" fill={`url(#cw-blue-${size})`} />
      </g>
      <g transform="rotate(-45 100 100)">
        <rect x="14" y="82" width="172" height="36" rx="18" fill={`url(#cw-teal-${size})`} opacity="0.92" />
        <rect x="86" y="82" width="28" height="36" fill="#008B9F" opacity="0.55" />
      </g>
      <circle cx="100" cy="20"  r="13" fill="#075EDB" />
      <circle cx="100" cy="180" r="13" fill="#075EDB" />
      <circle cx="180" cy="100" r="13" fill="#00CDBA" />
      <circle cx="20"  cy="100" r="13" fill="#00CDBA" />
    </svg>
  );
}

// ─── NAV ───────────────────────────────────────────────────────
function Navbar({ tab, setTab, accent, onChat }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "marketplace", label: "Marketplace" },
    { id: "services", label: "Services" },
    { id: "events", label: "Events" },
  ];

  const [isDark, setIsDark] = useState(
    () => window.__CW_REBRAND__ && document.documentElement.getAttribute("data-theme") !== "light"
  );

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("cw-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("cw-theme", "light");
    }
  };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 30, height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", boxSizing: "border-box",
      background: "rgba(26,25,25,0.78)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--hairline)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <button onClick={() => setTab("home")} style={{ background: "transparent", border: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 0 }}>
          <CrosswayMark size={28} />
          <span style={{ fontFamily: "var(--font-brand, var(--font-display))", fontWeight: "var(--logo-weight, 200)", fontSize: 22, letterSpacing: "var(--logo-tracking, -0.02em)", color: "var(--fg-1)", textTransform: "var(--logo-transform, none)" }}>crossway</span>
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {links.map(l => {
            const active = tab === l.id;
            return (
              <button key={l.id} onClick={() => setTab(l.id)} style={{
                background: "transparent", border: 0, cursor: "pointer",
                padding: "8px 14px", borderRadius: 999,
                fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
                letterSpacing: "0.04em",
                color: active ? "var(--accent-fg, var(--carbon-black))" : "var(--fg-2)",
                backgroundColor: active ? accent : "transparent",
                transition: "all 120ms var(--ease-out)",
              }}>{l.label}</button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <NavIcon name="bell" badge="3" />
        <NavIcon name="message-square" onClick={onChat} badge="2" />
        {window.__CW_REBRAND__ && (
          <button onClick={toggleTheme} className="cw-theme-toggle" title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            <Icon name={isDark ? "sun" : "moon"} size={16} />
          </button>
        )}
        <span style={{ width: 1, height: 22, background: "var(--hairline)", margin: "0 6px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 10px 4px 4px", background: "var(--bg-1)", borderRadius: 999, border: "1px solid var(--hairline)" }}>
          <span style={{ width: 26, height: 26, borderRadius: 999, background: "linear-gradient(135deg, #c9dc5e, #5a7d52)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "var(--carbon-black)" }}>EM</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-1)" }}>Emilia</span>
          <Icon name="chevron-down" size={12} style={{ color: "var(--fg-3)" }} />
        </div>
      </div>
    </nav>
  );
}

function NavIcon({ name, badge, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", background: "transparent", border: 0, cursor: "pointer",
      width: 38, height: 38, borderRadius: 8, color: "var(--fg-1)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon name={name} size={17} />
      {badge && <span style={{
        position: "absolute", top: 6, right: 6, minWidth: 16, height: 16, padding: "0 4px",
        borderRadius: 999, background: "var(--neon-lime)", color: "var(--carbon-black)",
        fontSize: 9, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 0 2px var(--carbon-black)",
      }}>{badge}</span>}
    </button>
  );
}

// ─── FEATURED ON HOME ──────────────────────────────────────────
function FeaturedSections({ accent, setTab, onChat, onItem, attending, onAttend }) {
  return (
    <>
      <div style={{ height: 1, background: "var(--hairline)", margin: "32px 48px 0", maxWidth: 1440, marginLeft: "auto", marginRight: "auto" }} />
      <Marketplace query="" onChat={onChat} onItem={onItem} accent={accent} />
      <div style={{ height: 1, background: "var(--hairline)", margin: "0 48px", maxWidth: 1440, marginLeft: "auto", marginRight: "auto" }} />
      <Services query="" onChat={onChat} accent={accent} />
      <div style={{ height: 1, background: "var(--hairline)", margin: "0 48px", maxWidth: 1440, marginLeft: "auto", marginRight: "auto" }} />
      <Events query="" accent={accent} onAttend={onAttend} attending={attending} />
    </>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────
function Footer({ accent, campus }) {
  const c = (window.CAMPUSES || []).find(x => x.id === campus);
  return (
    <footer style={{ borderTop: "1px solid var(--hairline)", marginTop: 32, padding: "64px 48px 40px", maxWidth: 1440, margin: "32px auto 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em", color: "var(--fg-1)" }}>
            Only for <span style={{ fontStyle: "italic", color: accent }}>students.</span>
          </div>
          <p style={{ marginTop: 18, maxWidth: "44ch", fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6 }}>
            Crossway verifies every account through university SSO. No personal emails, no bots, no scams.
            If you don't study at {c?.label || "your campus"}, you don't get in.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
            <Btn variant="primary" size="md" iconRight="arrow-right">Verify my account</Btn>
            <Btn variant="secondary" size="md">How it works</Btn>
          </div>
        </div>
        {[
          { h: "Product", links: ["Marketplace", "Services", "Events", "My inbox", "My listings"] },
          { h: "Trust & safety", links: ["SSO verification", "Report fraud", "Payment policy", "Reviews"] },
          { h: "Crossway", links: ["For universities", "Ambassadors", "Privacy", "Contact"] },
        ].map(col => (
          <div key={col.h}>
            <Eyebrow>{col.h}</Eyebrow>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map(l => <li key={l}><a href="#" style={{ color: "var(--fg-2)", fontSize: 13, textDecoration: "none", borderBottom: 0 }}>{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 64, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 22, borderTop: "1px solid var(--hairline)" }}>
        <div style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>© 2026 Crossway · v0.4 MVP · {c?.label}</div>
        <div style={{ fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Made with care in Reutlingen</div>
      </div>
    </footer>
  );
}

// ─── FAB ───────────────────────────────────────────────────────
function FAB({ onClick, accent }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 50,
      height: 56, padding: hover ? "0 22px 0 18px" : "0 18px",
      background: accent, color: "var(--carbon-black)",
      border: 0, borderRadius: 999, cursor: "pointer",
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, letterSpacing: "-0.005em",
      boxShadow: hover ? "0 14px 40px var(--accent-glow), inset 0 0 0 1px rgba(0,0,0,0.06)" : "0 8px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.06)",
      display: "inline-flex", alignItems: "center", gap: 10,
      transition: "all 220ms var(--ease-out)",
    }}>
      <span style={{ width: 24, height: 24, borderRadius: 999, background: "var(--carbon-black)", color: accent, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="plus" size={14} stroke={2} />
      </span>
      Post a listing
    </button>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
