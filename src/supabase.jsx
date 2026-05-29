/* global React */
/* Supabase client + helpers — loaded before all other JSX */

const SUPA_URL = "https://wnbzerpmdjuujiavrsvf.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduYnplcnBtZGp1dWppYXZyc3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMjAzNzEsImV4cCI6MjA5NTU5NjM3MX0.WNygBpY4SG9kUvJ3K3im-7F8XA7TVYjXpV2P_O243Wg";

const _supa = window.supabase.createClient(SUPA_URL, SUPA_KEY);

const _IMG = {
  Furniture:   "linear-gradient(135deg,#c9b89a,#8a7456)",
  Books:       "linear-gradient(135deg,#2a3b5c,#0e1a2e)",
  Electronics: "linear-gradient(135deg,#3a3a3a,#1a1a1a)",
  Transport:   "linear-gradient(135deg,#5a7d52,#2d4127)",
  Kitchen:     "linear-gradient(135deg,#8a8a8a,#4a4a4a)",
  Notes:       "linear-gradient(135deg,#c9dc5e,#6e7a2b)",
  Sports:      "linear-gradient(135deg,#c75050,#6e2424)",
  Other:       "linear-gradient(135deg,#c9dc5e,#6e7a2b)",
};
const _EMO = { Furniture:"🪑", Books:"📕", Electronics:"🖥", Transport:"🚲", Kitchen:"☕️", Notes:"📄", Sports:"🛼", Other:"📦" };

function _dbToItem(row) {
  return {
    id:       row.id,
    title:    row.title,
    price:    Number(row.price) || 0,
    currency: "€",
    category: row.category || "Other",
    condition:row.condition || "Good",
    seller:   row.seller_name || "Student",
    program:  "ESB · Reutlingen",
    verified: false,
    fromDB:   true,
    dist:     "Campus",
    img:      row.image_url ? `url(${row.image_url})` : (_IMG[row.category] || _IMG.Other),
    emoji:    row.image_url ? null : (_EMO[row.category] || "📦"),
    desc:     row.description || "—",
  };
}

async function supaEnsureAuth() {
  const { data: { session } } = await _supa.auth.getSession();
  if (!session) await _supa.auth.signInAnonymously();
}

async function supaFetchListings() {
  const { data, error } = await _supa
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) { console.error("fetch:", error); return []; }
  return (data || []).map(_dbToItem);
}

async function supaInsertListing({ title, price, category, condition, description, sellerName, imageFile }) {
  await supaEnsureAuth();
  const { data: { user } } = await _supa.auth.getUser();

  let imageUrl = null;
  if (imageFile) {
    const ext = (imageFile.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${(user?.id || "anon").slice(0,8)}/${Date.now()}.${ext}`;
    const { error: upErr } = await _supa.storage
      .from("listing-images")
      .upload(path, imageFile, { upsert: true });
    if (!upErr) {
      const { data: urlData } = _supa.storage.from("listing-images").getPublicUrl(path);
      imageUrl = urlData.publicUrl;
    } else {
      console.warn("image upload:", upErr.message);
    }
  }

  const { data, error } = await _supa.from("listings").insert({
    user_id:     user?.id,
    title,
    price:       parseFloat(price) || 0,
    category,
    condition,
    description,
    seller_name: sellerName || "Student",
    image_url:   imageUrl,
  }).select().single();

  if (error) { console.error("insert:", error); return null; }
  return _dbToItem(data);
}

function supaSubscribeListings(onNew) {
  const channel = _supa
    .channel("listings-realtime")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "listings" }, payload => {
      onNew(_dbToItem(payload.new));
    })
    .subscribe();
  return channel;
}

Object.assign(window, { _supa, supaEnsureAuth, supaFetchListings, supaInsertListing, supaSubscribeListings });
