/* global React, Icon, Eyebrow, Badge, VerifiedBadge, Btn, Stars, HoverLift, MARKETPLACE, SERVICES, EVENTS, CATEGORIES, CAMPUSES */
const { useState, useMemo } = React;

// ─── HERO ──────────────────────────────────────────────────────
function Hero({ campus, setCampus, onTab, onSearch, query, setQuery, accent }) {
  const stats = [
    { v: "2,847", l: "Verified students" },
    { v: "412", l: "Active items" },
    { v: "68", l: "Services" },
    { v: "14", l: "Events this week" },
  ];
  const tabs = [
    { id: "marketplace", label: "Marketplace", icon: "shopping-bag", desc: "Furniture, books, essentials", count: 412 },
    { id: "services",    label: "Services",    icon: "users-round",  desc: "Tutoring, freelance, gym", count: 68 },
    { id: "events",      label: "Events",      icon: "calendar",     desc: "Parties, study groups, talks", count: 14 },
  ];

  return (
    <section style={{ padding: "56px 48px 32px", maxWidth: 1440, margin: "0 auto", position: "relative" }}>
      {/* watermark mark */}
      <div aria-hidden style={{
        position: "absolute", right: -40, top: 0, fontFamily: "var(--font-display)", fontStyle: "italic",
        fontSize: 360, lineHeight: 1, color: "var(--bone-white)", opacity: 0.025, fontWeight: 200,
        pointerEvents: "none", letterSpacing: "-0.04em",
      }}>cw</div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
        <Eyebrow>Spring intake · 2026</Eyebrow>
        <span style={{ width: 28, height: 1, background: "var(--hairline-strong)" }} />
        <Eyebrow style={{ color: "var(--fg-3)" }}>v0.4 · MVP</Eyebrow>
      </div>

      <h1 className="modulo" style={{
        fontFamily: "var(--font-display)", fontWeight: 200, fontSize: "clamp(48px, 6.4vw, 92px)",
        lineHeight: 0.98, letterSpacing: "-0.03em", maxWidth: "16ch", margin: 0,
      }}>
        What do you need today at{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          <CampusPicker campus={campus} setCampus={setCampus} accent={accent} />
        </span>
        ,{" "}
        <span style={{ fontStyle: "italic", color: accent }}>all in one place.</span>
      </h1>

      <p style={{
        fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.6, color: "var(--fg-2)",
        maxWidth: "52ch", marginTop: 28, marginBottom: 36,
      }}>
        Crossway replaces scattered WhatsApp groups and forums.
        A closed ecosystem, only for students with a .edu email — to
        buy, sell, find partners, and stay on top of everything
        happening on campus.
      </p>

      {/* Search */}
      <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} accent={accent} />

      {/* Tabs / pillars */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 32 }}>
        {tabs.map(t => (
          <PillarCard key={t.id} tab={t} onClick={() => onTab(t.id)} accent={accent} />
        ))}
      </div>

      {/* Trust strip */}
      <div style={{
        marginTop: 32, padding: "18px 24px",
        background: "var(--bg-1)", border: "1px solid var(--hairline)",
        borderRadius: 12, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 999, background: "var(--accent-tint-md)",
            boxShadow: "inset 0 0 0 1px var(--accent-tint-edge)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", color: accent,
          }}><Icon name="shield-check" size={18} /></span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>University email only.</div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>No scams, no bots. Every account is verified through your campus SSO.</div>
          </div>
        </div>
        <span style={{ width: 1, height: 32, background: "var(--hairline)" }} />
        <div style={{ display: "flex", gap: 28, flex: 1, minWidth: 220, justifyContent: "flex-end" }}>
          {stats.map(s => (
            <div key={s.l} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 22, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>{s.v}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampusPicker({ campus, setCampus, accent }) {
  const [open, setOpen] = useState(false);
  const current = CAMPUSES.find(c => c.id === campus) || CAMPUSES[0];
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        cursor: "pointer", border: 0, background: "transparent", padding: "0 4px",
        fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 200,
        fontSize: "inherit", lineHeight: "inherit", color: accent, letterSpacing: "inherit",
        borderBottom: `1px dashed ${accent}`, display: "inline-flex", alignItems: "baseline", gap: 8,
      }}>
        {current.label}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ alignSelf: "center" }}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 41,
            background: "var(--bg-1)", border: "1px solid var(--hairline-strong)",
            borderRadius: 8, padding: 6, minWidth: 260, boxShadow: "var(--shadow-md)",
          }}>
            {CAMPUSES.map(c => (
              <button key={c.id} onClick={() => { setCampus(c.id); setOpen(false); }} style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "10px 12px", border: 0, background: c.id === campus ? "var(--bg-2)" : "transparent",
                borderRadius: 6, cursor: "pointer", textAlign: "left",
                fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-1)",
              }}>
                <Icon name="map-pin" size={14} style={{ color: c.id === campus ? accent : "var(--fg-3)" }} />
                {c.label}
                {c.id === campus && <span style={{ marginLeft: "auto", color: accent }}><Icon name="check" size={14} /></span>}
              </button>
            ))}
          </div>
        </>
      )}
    </span>
  );
}

function SearchBar({ query, setQuery, onSearch, accent }) {
  const [focus, setFocus] = useState(false);
  const suggestions = ["ikea desk", "statistics tutoring", "bicycle", "spring bash", "monitor 27"];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 0,
      background: "var(--bg-1)",
      border: `1px solid ${focus ? "var(--hairline-strong)" : "var(--hairline)"}`,
      borderRadius: 12, padding: 8,
      transition: "border-color 220ms var(--ease-out), box-shadow 220ms var(--ease-out)",
      boxShadow: focus ? "0 0 0 3px var(--accent-tint-sm)" : "none",
    }}>
      <span style={{ padding: "0 14px 0 16px", color: "var(--fg-2)" }}><Icon name="search" size={20} /></span>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        onKeyDown={e => e.key === "Enter" && onSearch?.()}
        placeholder="What do you need today? Try: desk, stats tutor, spring bash…"
        style={{
          flex: 1, border: 0, outline: 0, background: "transparent",
          fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-1)",
          padding: "12px 0", letterSpacing: "-0.005em",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 4, paddingRight: 4 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", color: "var(--fg-3)", fontSize: 11, fontFamily: "var(--font-mono)", border: "1px solid var(--hairline)", borderRadius: 6 }}>
          <span>⌘</span><span>K</span>
        </span>
        <Btn size="md" onClick={onSearch}>Search</Btn>
      </div>
    </div>
  );
}

function PillarCard({ tab, onClick, accent }) {
  const [hover, setHover] = useState(false);
  return (
    <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}
      style={{
        textAlign: "left", cursor: "pointer", border: 0, padding: "24px 22px",
        background: hover ? "var(--bg-2)" : "var(--bg-1)",
        borderRadius: 12, boxShadow: `inset 0 0 0 1px ${hover ? "var(--hairline-strong)" : "var(--hairline)"}`,
        transition: "all 220ms var(--ease-out)",
        display: "flex", flexDirection: "column", gap: 14, position: "relative", overflow: "hidden",
      }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          width: 40, height: 40, borderRadius: 8,
          background: hover ? accent : "var(--bg-2)",
          color: hover ? "var(--carbon-black)" : "var(--fg-1)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "all 220ms var(--ease-out)",
          boxShadow: hover ? "none" : "inset 0 0 0 1px var(--hairline-strong)",
        }}>
          <Icon name={tab.icon} size={20} stroke={1.6} />
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>{tab.count} active</span>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 600, color: "var(--fg-1)", letterSpacing: "-0.01em" }}>{tab.label}</div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-2)", marginTop: 4 }}>{tab.desc}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: hover ? accent : "var(--fg-2)", fontSize: 12, fontWeight: 500, marginTop: 4, transition: "color 220ms var(--ease-out)" }}>
        Browse all <Icon name="arrow-right" size={14} />
      </div>
    </button>
  );
}

Object.assign(window, { Hero });
