/* global React, Icon, Eyebrow, Badge, VerifiedBadge, Btn, Stars, HoverLift, useMobile, MARKETPLACE, SERVICES, EVENTS, REVIEWS, CATEGORIES */
const { useState, useMemo } = React;

// ─── MARKETPLACE ───────────────────────────────────────────────
function Marketplace({ query, onChat, onItem, accent, extraItems = [], campus = "esb-reutlingen" }) {
  const mobile = useMobile();
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("relevance");

  const items = useMemo(() => {
    let xs = [...extraItems, ...MARKETPLACE];
    if (cat !== "All") xs = xs.filter(i => i.category === cat);
    if (query) {
      const q = query.toLowerCase();
      xs = xs.filter(i => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    if (sort === "relevance") xs.sort((a,b) => {
      const aMatch = (a.campus || "esb-reutlingen") === campus ? 1 : 0;
      const bMatch = (b.campus || "esb-reutlingen") === campus ? 1 : 0;
      return bMatch - aMatch;
    });
    if (sort === "recent") xs.sort((a,b) => (b.fromDB ? 1 : 0) - (a.fromDB ? 1 : 0));
    if (sort === "low")    xs.sort((a,b) => a.price - b.price);
    if (sort === "high")   xs.sort((a,b) => b.price - a.price);
    return xs;
  }, [cat, sort, query, extraItems, campus]);

  return (
    <section className="cw-section" style={{ padding: mobile ? "24px 16px 40px" : "32px 48px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <ViewHeader
        eyebrow="Marketplace"
        title={<>What one student <span style={{ fontStyle: "italic", color: accent }}>doesn't need</span>, another one does.</>}
        meta={`${items.length} items · near your campus`}
      />

      <div style={{ marginTop: mobile ? 16 : 28 }}>
        <div style={{
          display: "flex", gap: 6,
          overflowX: mobile ? "auto" : "visible",
          flexWrap: mobile ? "nowrap" : "wrap",
          paddingBottom: mobile ? 4 : 0,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              cursor: "pointer", border: 0, flexShrink: 0,
              padding: mobile ? "7px 12px" : "8px 14px", borderRadius: 999,
              fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, letterSpacing: "0.04em",
              background: cat === c ? "var(--bone-white)" : "transparent",
              color: cat === c ? "var(--carbon-black)" : "var(--fg-2)",
              boxShadow: cat === c ? "none" : "inset 0 0 0 1px var(--hairline-strong)",
              transition: "all 120ms var(--ease-out)",
            }}>{c}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{
          background: "var(--bg-1)", border: "1px solid var(--hairline-strong)", color: "var(--fg-1)",
          padding: mobile ? "6px 10px" : "8px 12px", borderRadius: 6,
          fontFamily: "var(--font-sans)", fontSize: 12, outline: 0, cursor: "pointer",
          marginTop: 8, flexShrink: 0,
        }}>
          <option value="relevance">Relevance</option>
          <option value="recent">Latest listings</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      <div className="cw-market-grid" style={{
        marginTop: 24, display: "grid",
        gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(260px, 1fr))",
        gap: mobile ? 10 : 16,
      }}>
        {items.map(it => <MarketCard key={it.id} item={it} onChat={onChat} onItem={onItem} accent={accent} mobile={mobile} />)}
      </div>
    </section>
  );
}

function MarketCard({ item, onChat, onItem, accent, mobile }) {
  const [hover, setHover] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => onItem(item)}
      style={{
        background: "var(--bg-1)", borderRadius: 10, overflow: "hidden", cursor: "pointer",
        border: `1px solid ${hover ? "var(--hairline-strong)" : "var(--hairline)"}`,
        transition: "all 220ms var(--ease-out)",
        display: "flex", flexDirection: "column",
      }}>
      <div className="cw-market-img" style={{
        height: mobile ? 130 : 200, background: item.img, backgroundSize: "cover", backgroundPosition: "center", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {item.emoji && <span style={{ fontSize: mobile ? 48 : 72, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }}>{item.emoji}</span>}
        {!mobile && <div style={{ position: "absolute", top: 12, left: 12 }}><VerifiedBadge size="sm" /></div>}
        <button onClick={e => { e.stopPropagation(); setSaved(s => !s); }} style={{
          position: "absolute", top: 12, right: 12,
          width: 32, height: 32, borderRadius: 999, border: 0, cursor: "pointer",
          background: "rgba(26,25,25,0.7)", backdropFilter: "blur(8px)",
          color: saved ? accent : "var(--fg-1)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name={saved ? "bookmark-check" : "bookmark"} size={14} />
        </button>
        {!mobile && <div style={{ position: "absolute", bottom: 10, left: 12 }}>
          <Badge tone="neutral" size="sm">{item.condition}</Badge>
        </div>}
      </div>
      <div style={{ padding: mobile ? "10px 12px 12px" : "16px 18px 18px", display: "flex", flexDirection: "column", gap: mobile ? 8 : 12, flex: 1 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
            <h4 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: mobile ? 12 : 15, lineHeight: 1.3, color: "var(--fg-1)" }}>{item.title}</h4>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: mobile ? 18 : 24, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--fg-1)", whiteSpace: "nowrap" }}>
              {item.currency}{item.price}
            </div>
          </div>
          <div style={{ fontSize: 10, color: "var(--fg-3)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
            {item.category}{mobile ? ` · ${item.condition}` : ""}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginTop: "auto", paddingTop: mobile ? 8 : 12, borderTop: "1px solid var(--hairline)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
            <span style={{ width: 20, height: 20, borderRadius: 999, background: "var(--bg-2)", color: "var(--fg-1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0 }}>
              {item.seller.split(" ").map(n => n[0].toUpperCase()).join("")}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: mobile ? 10 : 11, fontWeight: 600, color: "var(--fg-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.seller}</div>
              {!mobile && <div style={{ fontSize: 10, color: "var(--fg-3)", display: "flex", alignItems: "center", gap: 4 }}>
                <Icon name="map-pin" size={9} />{item.dist}
              </div>}
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); onChat(item); }} style={{
            border: 0, background: hover ? accent : "var(--bg-2)",
            color: hover ? "var(--carbon-black)" : "var(--fg-1)",
            padding: mobile ? "6px 8px" : "8px 12px", borderRadius: 6, cursor: "pointer",
            fontFamily: "var(--font-sans)", fontSize: mobile ? 10 : 11, fontWeight: 600, letterSpacing: "0.02em",
            display: "inline-flex", alignItems: "center", gap: 4,
            transition: "all 120ms var(--ease-out)",
          }}>
            <Icon name="message-square" size={10} /> Chat
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES ──────────────────────────────────────────────────
function Services({ query, onChat, accent }) {
  const mobile = useMobile();
  const items = useMemo(() => {
    if (!query) return SERVICES;
    const q = query.toLowerCase();
    return SERVICES.filter(s => s.name.toLowerCase().includes(q) || s.tags.join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="cw-section" style={{ padding: mobile ? "24px 16px 40px" : "32px 48px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <ViewHeader
        eyebrow="Services · Student-to-student"
        title={<>Campus skills,{" "}<span style={{ fontStyle: "italic", color: accent }}>within reach.</span></>}
        meta={`${items.length} services · review-based`}
        right={<Btn variant="secondary" size="sm" icon="plus">Offer yours</Btn>}
      />

      <div className="cw-service-grid" style={{
        marginTop: 28, display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fill, minmax(360px, 1fr))",
        gap: 16,
      }}>
        {items.map(s => <ServiceCard key={s.id} svc={s} onChat={onChat} accent={accent} />)}
      </div>
    </section>
  );
}

function ServiceCard({ svc, onChat, accent }) {
  const [hover, setHover] = useState(false);
  const accentColor = svc.accent === "lime" ? "var(--neon-lime)" : svc.accent === "yale" ? "var(--info-fg)" : "var(--fg-2)";
  const accentBg    = svc.accent === "lime" ? "var(--accent-tint-md)" : svc.accent === "yale" ? "var(--info-tint-sm)" : "var(--bg-2)";
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      background: "var(--bg-1)", borderRadius: 12, padding: 22,
      border: `1px solid ${hover ? "var(--hairline-strong)" : "var(--hairline)"}`,
      transition: "all 220ms var(--ease-out)",
      display: "flex", flexDirection: "column", gap: 16, position: "relative", overflow: "hidden",
    }}>
      {/* accent corner */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 64, height: 2, background: accentColor }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", minWidth: 0, flex: 1 }}>
          <span style={{
            width: 44, height: 44, borderRadius: 8, background: accentBg, color: accentColor,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 22, letterSpacing: "-0.04em", flexShrink: 0,
          }}>{svc.provider.split(" ").map(n => n[0].toUpperCase()).join("").slice(0,2)}</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h4 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--fg-1)", letterSpacing: "-0.005em" }}>{svc.name}</h4>
              <span style={{ display: "inline-flex", flexShrink: 0 }}><VerifiedBadge size="sm" /></span>
            </div>
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 500, color: "var(--fg-1)" }}>{svc.provider}</span>
              <span style={{ width: 3, height: 3, borderRadius: 999, background: "var(--fg-3)" }} />
              <span>{svc.program}</span>
            </div>
          </div>
        </div>
      </div>

      <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 13, lineHeight: 1.55, color: "var(--fg-2)" }}>{svc.desc}</p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {svc.tags.map(t => <Badge key={t} tone="neutral" size="sm">{t}</Badge>)}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 14, borderTop: "1px solid var(--hairline)", marginTop: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Stars value={svc.rating} size={12} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-1)", fontWeight: 600 }}>{svc.rating.toFixed(1)}</span>
            <span style={{ fontSize: 11, color: "var(--fg-3)" }}>({svc.reviews})</span>
          </div>
          <span style={{ width: 1, height: 12, background: "var(--hairline)" }} />
          <div style={{ fontSize: 11, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="clock" size={11} /> {svc.avail}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 24, lineHeight: 1, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>
            {svc.price === 0 ? <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: accent }}>Trade</span> : <>€{svc.price}<span style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-sans)", marginLeft: 2 }}>{svc.unit}</span></>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Btn variant="secondary" size="sm" icon="message-square" onClick={() => onChat(svc)}>Message</Btn>
        <Btn variant="primary" size="sm" iconRight="arrow-right" full>Book</Btn>
      </div>
    </div>
  );
}

// ─── EVENTS ────────────────────────────────────────────────────
function Events({ query, accent, onAttend, attending }) {
  const mobile = useMobile();
  const items = useMemo(() => {
    if (!query) return EVENTS;
    const q = query.toLowerCase();
    return EVENTS.filter(e => e.title.toLowerCase().includes(q) || e.tag.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="cw-section" style={{ padding: mobile ? "24px 16px 40px" : "32px 48px 64px", maxWidth: 1440, margin: "0 auto" }}>
      <ViewHeader
        eyebrow="Campus calendar"
        title={<>This week on <span style={{ fontStyle: "italic", color: accent }}>campus.</span></>}
        meta={`${items.length} events · next 7 days`}
        right={<div style={{ display: "flex", gap: 6 }}>
          <Btn variant="secondary" size="sm" icon="list">List</Btn>
          <Btn variant="ghost" size="sm" icon="calendar-days">Month</Btn>
        </div>}
      />

      <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(e => <EventRow key={e.id} ev={e} accent={accent} onAttend={onAttend} attending={attending.has(e.id)} />)}
      </div>
    </section>
  );
}

function EventRow({ ev, accent, onAttend, attending }) {
  const mobile = useMobile();
  const [hover, setHover] = useState(false);
  const c = ev.color === "lime" ? accent : "var(--info-fg)";
  const cBg = ev.color === "lime" ? "var(--accent-tint-xs)" : "var(--info-tint-md)";
  const pct = Math.round((ev.attendees / ev.capacity) * 100);

  const DateBox = () => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      background: cBg, borderRadius: 8, padding: mobile ? "10px 6px" : "14px 8px",
      width: mobile ? 64 : "auto",
      boxShadow: `inset 0 0 0 1px ${ev.color === "lime" ? "var(--accent-tint-edge-sm)" : "var(--info-tint-edge)"}`,
    }}>
      <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: c, fontWeight: 600 }}>{ev.date.m}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: mobile ? 30 : 44, lineHeight: 1, letterSpacing: "-0.04em", color: "var(--fg-1)", margin: "2px 0" }}>{ev.date.d}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-2)" }}>{ev.date.time}</div>
    </div>
  );

  if (mobile) {
    return (
      <div style={{
        display: "grid", gridTemplateColumns: "68px 1fr", gap: 16, alignItems: "flex-start",
        background: "var(--bg-1)", border: "1px solid var(--hairline)",
        borderRadius: 12, padding: 14, transition: "all 220ms var(--ease-out)",
      }}>
        <DateBox />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Badge tone={ev.color === "lime" ? "lime" : "yale"} size="sm">{ev.tag}</Badge>
            <span style={{ fontSize: 10, color: "var(--fg-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "14ch" }}>by {ev.host}</span>
          </div>
          <h4 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em", color: "var(--fg-1)", lineHeight: 1.3 }}>{ev.title}</h4>
          <div style={{ fontSize: 11, color: "var(--fg-2)", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="map-pin" size={10} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.where}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 2 }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 3, background: "var(--bg-2)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: c }} />
              </div>
              <div style={{ fontSize: 10, color: "var(--fg-3)", marginTop: 3 }}>{ev.attendees}/{ev.capacity} · {pct}%</div>
            </div>
            <Btn variant={attending ? "secondary" : "primary"} size="xs" icon={attending ? "check" : "calendar-plus"} onClick={() => onAttend(ev.id)}>
              {attending ? "Going" : "Attend"}
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
      display: "grid", gridTemplateColumns: "104px 1fr auto", gap: 24, alignItems: "stretch",
      background: "var(--bg-1)", border: `1px solid ${hover ? "var(--hairline-strong)" : "var(--hairline)"}`,
      borderRadius: 12, padding: 20, transition: "all 220ms var(--ease-out)",
    }}>
      <DateBox />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Badge tone={ev.color === "lime" ? "lime" : "yale"} size="sm">{ev.tag}</Badge>
          <span style={{ fontSize: 11, color: "var(--fg-3)" }}>by {ev.host}</span>
        </div>
        <h4 style={{ margin: 0, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em", color: "var(--fg-1)" }}>{ev.title}</h4>
        <p style={{ margin: 0, fontSize: 13, color: "var(--fg-2)", lineHeight: 1.5 }}>{ev.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "var(--fg-2)", fontSize: 12, marginTop: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="map-pin" size={12} />{ev.where}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="users-round" size={12} />{ev.attendees} / {ev.capacity}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", gap: 16, minWidth: 180 }}>
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: 6, textAlign: "right" }}>Capacity · {pct}%</div>
          <div style={{ height: 4, background: "var(--bg-2)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: c, transition: "width 400ms var(--ease-out)" }} />
          </div>
        </div>
        <Btn variant={attending ? "secondary" : "primary"} size="sm" icon={attending ? "check" : "calendar-plus"} onClick={() => onAttend(ev.id)}>
          {attending ? "Confirmed" : "Attend"}
        </Btn>
      </div>
    </div>
  );
}

// ─── HEADER ────────────────────────────────────────────────────
function ViewHeader({ eyebrow, title, meta, right }) {
  const mobile = useMobile();
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="modulo" style={{
          fontFamily: "var(--font-display)", fontWeight: 200,
          fontSize: mobile ? "clamp(26px, 7vw, 36px)" : "clamp(34px, 4vw, 52px)",
          lineHeight: 1.05, letterSpacing: "-0.025em", margin: "10px 0 6px", maxWidth: "20ch",
        }}>{title}</h2>
        {meta && <div style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>{meta}</div>}
      </div>
      {right && !mobile && <div style={{ paddingBottom: 8 }}>{right}</div>}
    </div>
  );
}

Object.assign(window, { Marketplace, Services, Events, ViewHeader });
