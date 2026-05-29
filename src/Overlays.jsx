/* global React, Icon, Eyebrow, Badge, VerifiedBadge, Btn, Stars, useMobile, CHAT, CHAT_THREAD, REVIEWS */
const { useState, useEffect, useRef } = React;

// ─── CHAT OVERLAY ──────────────────────────────────────────────
function ChatOverlay({ open, onClose, initial, accent }) {
  const mobile = useMobile();
  const [active, setActive] = useState(initial?.id || CHAT[0].id);
  const [showThread, setShowThread] = useState(!!initial);
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState(CHAT_THREAD);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const current = CHAT.find(c => c.id === active) || CHAT[0];

  useEffect(() => { if (initial) { setActive(initial.id); setShowThread(true); } }, [initial]);
  useEffect(() => { endRef.current?.parentElement?.scrollTo({ top: 9e9, behavior: "smooth" }); }, [thread, typing]);

  const send = () => {
    if (!draft.trim()) return;
    const text = draft;
    setThread(t => [...t, { id: "n" + Date.now(), from: "me", text, time: "now" }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setThread(t => [...t, { id: "r" + Date.now(), from: "her", text: "Perfect — I'll let you know as soon as I confirm and we'll sort it out.", time: "now" }]);
    }, 1400);
  };

  const selectChat = (id) => { setActive(id); if (mobile) setShowThread(true); };

  if (!open) return null;

  const InboxList = () => (
    <aside style={{ background: "var(--bg-1)", borderRight: mobile ? "none" : "1px solid var(--hairline)", display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
      <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <Eyebrow>Messages</Eyebrow>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 26, letterSpacing: "-0.02em", marginTop: 6, color: "var(--fg-1)" }}>Inbox</div>
        </div>
        <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--fg-2)", cursor: "pointer", padding: 6, borderRadius: 6 }}><Icon name="x" size={18} /></button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 6 }}>
        {CHAT.map(c => (
          <button key={c.id} onClick={() => selectChat(c.id)} style={{
            width: "100%", display: "flex", gap: 10, padding: "12px 12px",
            background: active === c.id ? "var(--bg-2)" : "transparent", border: 0, borderRadius: 8,
            cursor: "pointer", textAlign: "left", marginBottom: 2,
          }}>
            <span style={{
              width: 36, height: 36, borderRadius: 999, background: c.color,
              flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 16, letterSpacing: "-0.02em", color: "var(--carbon-black)",
            }}>{c.from.split(" ").map(n => n[0]).join("").slice(0,2)}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.from}</span>
                <span style={{ fontSize: 10, color: "var(--fg-3)", flexShrink: 0 }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 2, fontFamily: "var(--font-mono)" }}>re: {c.item}</div>
              <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.last}</div>
            </div>
            {c.unread > 0 && <span style={{ width: 8, height: 8, borderRadius: 999, background: accent, alignSelf: "flex-start", marginTop: 6, flexShrink: 0 }} />}
          </button>
        ))}
      </div>
    </aside>
  );

  const Thread = () => (
    <main style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1, background: "var(--bg-0)" }}>
      <header style={{ padding: "14px 16px", borderBottom: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          {mobile && (
            <button onClick={() => setShowThread(false)} style={{ background: "transparent", border: 0, color: "var(--fg-2)", cursor: "pointer", padding: "4px 4px 4px 0", display: "inline-flex", alignItems: "center" }}>
              <Icon name="arrow-left" size={20} />
            </button>
          )}
          <span style={{
            width: 36, height: 36, borderRadius: 999, background: current.color,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 16, color: "var(--carbon-black)", flexShrink: 0,
          }}>{current.from.split(" ").map(n => n[0]).join("").slice(0,2)}</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-1)" }}>{current.from}</span>
              <VerifiedBadge size="sm" />
            </div>
            <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>re: {current.item}</div>
          </div>
        </div>
        {!mobile && <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--fg-2)", cursor: "pointer", padding: 6, borderRadius: 6 }}><Icon name="x" size={18} /></button>}
      </header>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ alignSelf: "center", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 0" }}>Today</div>
        {thread.map(m => (
          <div key={m.id} style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", maxWidth: "80%", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{
              padding: "10px 14px", borderRadius: 10,
              background: m.from === "me" ? accent : "var(--bg-1)",
              color: m.from === "me" ? "var(--carbon-black)" : "var(--fg-1)",
              border: m.from === "me" ? "0" : "1px solid var(--hairline)",
              fontSize: 13, lineHeight: 1.5, fontFamily: "var(--font-sans)",
              borderBottomRightRadius: m.from === "me" ? 2 : 10,
              borderBottomLeftRadius: m.from === "me" ? 10 : 2,
            }}>{m.text}</div>
            <div style={{ fontSize: 10, color: "var(--fg-3)", textAlign: m.from === "me" ? "right" : "left", padding: "0 4px", fontFamily: "var(--font-mono)" }}>{m.time}</div>
          </div>
        ))}
        {typing && (
          <div style={{ alignSelf: "flex-start", padding: "12px 14px", background: "var(--bg-1)", borderRadius: 10, border: "1px solid var(--hairline)", display: "inline-flex", gap: 4 }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: 999, background: "var(--fg-2)", animation: `cwbounce 1.2s var(--ease-in-out) ${i * 0.15}s infinite` }} />)}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <footer style={{ borderTop: "1px solid var(--hairline)", padding: 12, display: "flex", gap: 8 }}>
        <button style={{ background: "var(--bg-1)", border: "1px solid var(--hairline)", color: "var(--fg-2)", borderRadius: 8, width: 38, height: 38, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="paperclip" size={14} /></button>
        <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message…" style={{
          flex: 1, minWidth: 0, background: "var(--bg-1)", border: "1px solid var(--hairline)", borderRadius: 8,
          padding: "0 14px", color: "var(--fg-1)", fontFamily: "var(--font-sans)", fontSize: 13, outline: 0, height: 38,
        }} />
        <Btn size="sm" icon="send" onClick={send}>Send</Btn>
      </footer>
    </main>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", zIndex: 80, animation: "cwfade 220ms var(--ease-out)" }} />
      {mobile ? (
        <div style={{
          position: "fixed", inset: 0, zIndex: 81,
          background: "var(--bg-0)",
          display: "flex", flexDirection: "column",
          animation: "cwslide 280ms var(--ease-out)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}>
          {showThread ? <Thread /> : <InboxList />}
        </div>
      ) : (
        <div style={{
          position: "fixed", right: 24, bottom: 24, top: 80, width: 760, maxWidth: "calc(100vw - 48px)",
          background: "var(--bg-0)", border: "1px solid var(--hairline-strong)", borderRadius: 12,
          boxShadow: "var(--shadow-lg)", zIndex: 81,
          display: "grid", gridTemplateColumns: "260px 1fr", overflow: "hidden",
          animation: "cwslide 280ms var(--ease-out)",
        }}>
          <InboxList />
          <Thread />
        </div>
      )}
    </>
  );
}

// ─── ITEM DETAIL DRAWER ────────────────────────────────────────
function ItemDrawer({ item, onClose, onChat, accent }) {
  if (!item) return null;
  const itemReviews = REVIEWS.filter(r => r.target === item.seller).concat(REVIEWS.slice(0, 2));
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", zIndex: 80, animation: "cwfade 220ms var(--ease-out)" }} />
      <div style={{
        position: "fixed", right: 0, top: 0, bottom: 0, width: 540, maxWidth: "92vw",
        background: "var(--bg-0)", borderLeft: "1px solid var(--hairline-strong)",
        zIndex: 81, overflow: "hidden", display: "flex", flexDirection: "column",
        animation: "cwslideright 320ms var(--ease-out)",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, zIndex: 2, background: "rgba(26,25,25,0.7)", border: "1px solid var(--hairline-strong)", borderRadius: 999, width: 36, height: 36, color: "var(--fg-1)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="x" size={16} /></button>

        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ height: 320, background: item.img, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <span style={{ fontSize: 140, filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))" }}>{item.emoji}</span>
            <div style={{ position: "absolute", bottom: 16, left: 20, display: "flex", gap: 8 }}>
              <VerifiedBadge size="sm" />
              <Badge tone="neutral" size="sm">{item.condition}</Badge>
            </div>
          </div>

          <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <Eyebrow>{item.category}</Eyebrow>
              <h2 className="modulo" style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 36, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: 10, color: "var(--fg-1)" }}>{item.title}</h2>
              <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 56, lineHeight: 1, letterSpacing: "-0.03em", color: accent }}>{item.currency}{item.price}</span>
                <span style={{ fontSize: 12, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>negotiable</span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--fg-2)" }}>{item.desc}</p>

            <div style={{ background: "var(--bg-1)", border: "1px solid var(--hairline)", borderRadius: 10, padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ width: 48, height: 48, borderRadius: 999, background: "var(--bg-2)", color: "var(--fg-1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 20 }}>
                {item.seller.split(" ").map(n => n[0]).join("")}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-1)" }}>{item.seller}</span>
                  <VerifiedBadge size="sm" />
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4 }}>{item.program}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>
                  <Stars value={4.8} size={10} /> 4.8 · 12 transactions · {item.dist}
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <Eyebrow>Seller reviews</Eyebrow>
                <span style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-mono)" }}>{itemReviews.length} reviews</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {itemReviews.slice(0, 3).map(r => <ReviewCard key={r.id} r={r} accent={accent} />)}
              </div>
            </div>
          </div>
        </div>

        <footer style={{ borderTop: "1px solid var(--hairline)", padding: 16, display: "flex", gap: 8, background: "var(--bg-0)" }}>
          <Btn variant="secondary" size="md" icon="bookmark">Save</Btn>
          <Btn variant="primary" size="md" icon="message-square" onClick={() => { onChat(item); onClose(); }} full>Message {item.seller.split(" ")[0]}</Btn>
        </footer>
      </div>
    </>
  );
}

function ReviewCard({ r, accent }) {
  return (
    <div style={{ background: "var(--bg-1)", border: "1px solid var(--hairline)", borderRadius: 10, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-1)" }}>{r.author}</span>
            <span style={{ width: 3, height: 3, borderRadius: 999, background: "var(--fg-3)" }} />
            <span style={{ fontSize: 11, color: "var(--fg-3)" }}>{r.program}</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 3, fontFamily: "var(--font-mono)" }}>{r.role} · {r.when}</div>
        </div>
        <Stars value={r.rating} size={12} />
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "var(--fg-2)" }}>{r.text}</p>
    </div>
  );
}

// ─── POST AD MODAL ─────────────────────────────────────────────
const EMOJI_MAP = { Furniture: "🪑", Books: "📕", Electronics: "🖥", Transport: "🚲", Kitchen: "☕️", Notes: "📄", Sports: "🛼", Other: "📦" };
const IMG_MAP   = { Furniture: "linear-gradient(135deg,#c9b89a,#8a7456)", Books: "linear-gradient(135deg,#2a3b5c,#0e1a2e)", Electronics: "linear-gradient(135deg,#3a3a3a,#1a1a1a)", Transport: "linear-gradient(135deg,#5a7d52,#2d4127)", Kitchen: "linear-gradient(135deg,#8a8a8a,#4a4a4a)", Notes: "linear-gradient(135deg,#c9dc5e,#6e7a2b)", Sports: "linear-gradient(135deg,#c75050,#6e2424)", Other: "linear-gradient(135deg,#c9dc5e,#6e7a2b)" };

function PostAdModal({ open, onClose, accent, onPost }) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("item");
  const [done, setDone] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Good");
  const [category, setCategory] = useState("Other");
  const [desc, setDesc] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleFiles = (files) => {
    const imgs = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .map(f => ({ url: URL.createObjectURL(f), name: f.name, file: f }));
    setImages(xs => [...xs, ...imgs]);
  };

  const removeImage = (idx) => setImages(xs => xs.filter((_, i) => i !== idx));

  useEffect(() => {
    if (!open) {
      images.forEach(i => URL.revokeObjectURL(i.url));
      setStep(0); setDone(false); setPublishing(false);
      setTitle(""); setPrice(""); setCondition("Good"); setCategory("Other"); setDesc(""); setSellerName(""); setImages([]);
    }
  }, [open]);

  if (!open) return null;

  const types = [
    { id: "item", icon: "shopping-bag", label: "Sell an item", desc: "Furniture, books, electronics…" },
    { id: "service", icon: "users-round", label: "Offer a service", desc: "Tutoring, freelance, gym partner…" },
    { id: "event", icon: "calendar", label: "Create an event", desc: "Study, party, workshop…" },
  ];

  const publish = async () => {
    if (!title.trim() || publishing) return;
    setPublishing(true);
    const newItem = {
      id:        "m" + Date.now(),
      title:     title.trim(),
      price:     parseFloat(price) || 0,
      currency:  "€",
      category,
      condition,
      seller:    sellerName.trim() || "Student",
      program:   "ESB · Reutlingen",
      verified:  true,
      dist:      "Campus",
      img:       images.length > 0 ? `url(${images[0].url})` : (IMG_MAP[category] || IMG_MAP.Other),
      emoji:     images.length > 0 ? null : (EMOJI_MAP[category] || "📦"),
      desc:      desc.trim() || "—",
    };
    await onPost?.(newItem, images[0]?.file || null);
    setPublishing(false);
    setDone(true);
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", zIndex: 90, animation: "cwfade 220ms var(--ease-out)" }} />
      <div role="dialog" style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 560, maxWidth: "92vw", maxHeight: "85vh", overflow: "auto",
        background: "var(--bg-0)", border: "1px solid var(--hairline-strong)", borderRadius: 12,
        zIndex: 91, boxShadow: "var(--shadow-lg)", animation: "cwpop 280ms var(--ease-emphasis)",
      }}>
        <header style={{ padding: "22px 28px 16px", borderBottom: "1px solid var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Eyebrow>New post</Eyebrow>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 28, letterSpacing: "-0.02em", marginTop: 6, color: "var(--fg-1)" }}>{done ? "Done." : step === 0 ? "What are you posting?" : "Details"}</div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: 0, color: "var(--fg-2)", cursor: "pointer" }}><Icon name="x" size={20} /></button>
        </header>

        <div style={{ padding: 28 }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "32px 20px" }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: 999, background: "var(--accent-tint-md)", boxShadow: "inset 0 0 0 1px var(--accent-tint-edge)", color: accent, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="check" size={28} stroke={1.8} /></div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 200, fontSize: 32, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>Posted.</div>
              <p style={{ margin: "12px auto 0", maxWidth: "32ch", fontSize: 14, color: "var(--fg-2)" }}>Tu publicación ya es visible para <span style={{ color: accent }}>2,847</span> estudiantes verificados en tu campus.</p>
              <div style={{ marginTop: 28, display: "flex", gap: 8, justifyContent: "center" }}>
                <Btn variant="secondary" size="md" onClick={onClose}>Cerrar</Btn>
                <Btn variant="primary" size="md" iconRight="arrow-right" onClick={onClose}>Ver mi publicación</Btn>
              </div>
            </div>
          ) : step === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {types.map(t => (
                <button key={t.id} onClick={() => setType(t.id)} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", textAlign: "left", cursor: "pointer",
                  background: type === t.id ? "var(--bg-2)" : "var(--bg-1)", borderRadius: 10,
                  border: `1px solid ${type === t.id ? accent : "var(--hairline)"}`,
                  transition: "all 120ms var(--ease-out)",
                }}>
                  <span style={{ width: 40, height: 40, borderRadius: 8, background: type === t.id ? accent : "var(--bg-2)", color: type === t.id ? "var(--carbon-black)" : "var(--fg-1)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={t.icon} size={18} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--fg-1)" }}>{t.label}</div>
                    <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{t.desc}</div>
                  </div>
                  {type === t.id && <Icon name="check" size={18} style={{ color: accent }} />}
                </button>
              ))}
              <Btn variant="primary" size="md" iconRight="arrow-right" full onClick={() => setStep(1)} style={{ marginTop: 16 }}>Continue</Btn>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field label="Tu nombre">
                <input value={sellerName} onChange={e => setSellerName(e.target.value)} placeholder="Ej: Ana, Mateo, Julia…" />
              </Field>
              <Field label="Title">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ej: Silla IKEA, escritorio, bicicleta…" />
              </Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <Field label="Price (€)">
                  <input value={price} onChange={e => setPrice(e.target.value)} placeholder="0" type="number" min="0" />
                </Field>
                <Field label="Category">
                  <select value={category} onChange={e => setCategory(e.target.value)}>
                    {["Furniture","Books","Electronics","Transport","Kitchen","Notes","Sports","Other"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Condition">
                  <select value={condition} onChange={e => setCondition(e.target.value)}>
                    <option>Like new</option><option>Good</option><option>Fair</option>
                  </select>
                </Field>
              </div>
              <Field label="Description">
                <textarea rows={4} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descripción del objeto, dónde retirarlo, disponibilidad…" />
              </Field>
              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }}
                onChange={e => { handleFiles(e.target.files); e.target.value = ""; }} />

              {images.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 8 }}>
                  {images.map((img, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "1px solid var(--hairline)" }}>
                      <img src={img.url} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <button onClick={() => removeImage(i)} style={{
                        position: "absolute", top: 4, right: 4, width: 20, height: 20,
                        borderRadius: 999, border: 0, background: "rgba(0,0,0,0.65)", color: "#fff",
                        display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0,
                      }}><Icon name="x" size={10} /></button>
                    </div>
                  ))}
                  <button onClick={() => fileRef.current.click()} style={{
                    aspectRatio: "1", borderRadius: 8, border: "1px dashed var(--hairline-strong)",
                    background: "var(--bg-1)", color: "var(--fg-3)", cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 10,
                  }}>
                    <Icon name="plus" size={16} />
                    Add
                  </button>
                </div>
              )}

              {images.length === 0 && (
                <div
                  onClick={() => fileRef.current.click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                  style={{
                    background: dragOver ? "var(--bg-2)" : "var(--bg-1)",
                    border: `1px dashed ${dragOver ? accent : "var(--hairline-strong)"}`,
                    borderRadius: 8, padding: "28px 20px", textAlign: "center",
                    color: "var(--fg-3)", fontSize: 12, cursor: "pointer",
                    transition: "all 140ms var(--ease-out)",
                  }}>
                  <Icon name="image-plus" size={22} />
                  <div style={{ marginTop: 8, fontWeight: 500 }}>Arrastrá fotos o hacé click para subir</div>
                  <div style={{ marginTop: 4, fontSize: 11, color: "var(--fg-3)" }}>JPG, PNG, WEBP · múltiples imágenes · también desde el celular</div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, justifyContent: "space-between", marginTop: 4 }}>
                <Btn variant="ghost" size="md" icon="arrow-left" onClick={() => setStep(0)}>Back</Btn>
                <Btn variant="primary" size="md" iconRight="check" onClick={publish} disabled={!title.trim() || publishing}>{publishing ? "Publicando…" : "Publish"}</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-2)", fontWeight: 500 }}>{label}</span>
      <span className="cw-field-wrap" style={{ display: "block" }}>
        {children}
      </span>
    </label>
  );
}

Object.assign(window, { ChatOverlay, ItemDrawer, PostAdModal, ReviewCard });
