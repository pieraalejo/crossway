/* global React */
// Crossway — mock data

const MARKETPLACE = [
  // ── ESB Reutlingen ──────────────────────────────────────────
  { id: "m1", campus: "esb-reutlingen", title: "IKEA Linnmon Desk", price: 45, currency: "€", category: "Furniture", condition: "Good", seller: "Lucia F.", program: "BSc International Business", verified: true, dist: "5 min · Campus", location: "Wohnheim 3, Reutlingen", img: "linear-gradient(135deg, #c9b89a 0%, #8a7456 100%)", emoji: "🪑", desc: "White desk 100×60. No marks. Available from May 15." },
  { id: "m2", campus: "esb-reutlingen", title: "Macroeconomics — Mankiw, 9e", price: 18, currency: "€", category: "Books", condition: "Like new", seller: "Tomas R.", program: "MSc Finance", verified: true, dist: "Wohnheim 7", location: "Wohnheim 7, Reutlingen", img: "linear-gradient(135deg, #2a3b5c 0%, #0e1a2e 100%)", emoji: "📕", desc: "Used for one semester. No highlights." },
  { id: "m3", campus: "esb-reutlingen", title: "Urban bicycle 28″", price: 120, currency: "€", category: "Transport", condition: "Good", seller: "Karim H.", program: "BSc Mechatronics", verified: true, dist: "Reutlingen Süd", location: "Reutlingen Südbahnhof", img: "linear-gradient(135deg, #5a7d52 0%, #2d4127 100%)", emoji: "🚲", desc: "Shimano gears, helmet included. Perfect campus commute." },
  { id: "m4", campus: "esb-reutlingen", title: "LG 27\" QHD Monitor", price: 165, currency: "€", category: "Electronics", condition: "Excellent", seller: "Anna W.", program: "MSc Digital Industrial Mgmt", verified: true, dist: "5 min · Campus", location: "Campus ESB, Building A", img: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)", emoji: "🖥", desc: "27UL500. HDMI cable included. Original box." },
  { id: "m5", campus: "esb-reutlingen", title: "Bialetti Moka 6 coffee maker", price: 14, currency: "€", category: "Kitchen", condition: "Good", seller: "Sofia M.", program: "BSc European Business", verified: true, dist: "Wohnheim 4", location: "Wohnheim 4, Reutlingen", img: "linear-gradient(135deg, #8a8a8a 0%, #4a4a4a 100%)", emoji: "☕️", desc: "Clean, no residue. Works perfectly." },
  { id: "m6", campus: "esb-reutlingen", title: "Hektar floor lamp", price: 32, currency: "€", category: "Furniture", condition: "Like new", seller: "Pablo G.", program: "MSc Operations Mgmt", verified: true, dist: "Reutlingen Mitte", location: "Reutlingen Stadtmitte", img: "linear-gradient(135deg, #d4cfa8 0%, #8a8568 100%)", emoji: "💡", desc: "LED bulb included. Anthracite finish." },
  { id: "m7", campus: "esb-reutlingen", title: "Inline skates — size 42", price: 28, currency: "€", category: "Sports", condition: "Fair", seller: "Mateo D.", program: "BSc Logistics Mgmt", verified: true, dist: "Wohnheim 9", location: "Wohnheim 9, Reutlingen", img: "linear-gradient(135deg, #c75050 0%, #6e2424 100%)", emoji: "🛼", desc: "Used one summer. Light wheel wear." },
  { id: "m8", campus: "esb-reutlingen", title: "Notes — Statistics II (PDF + handwritten)", price: 6, currency: "€", category: "Notes", condition: "Digital", seller: "Julia C.", program: "MSc Finance", verified: true, dist: "Online", location: "Digital delivery", img: "linear-gradient(135deg, #c9dc5e 0%, #6e7a2b 100%)", emoji: "📄", desc: "Full summary + 40 solved exercises. Final grade 1.3." },

  // ── Universität Tübingen ────────────────────────────────────
  { id: "t1", campus: "uni-tuebingen", title: "Neuroscience — Kandel, 5e", price: 22, currency: "€", category: "Books", condition: "Good", seller: "Mia S.", program: "BSc Neuroscience", verified: true, dist: "Wilhelmstr.", location: "Wilhelmstraße Dorms, Tübingen", img: "linear-gradient(135deg, #2a3b5c 0%, #0e1a2e 100%)", emoji: "📕", desc: "Lightly annotated. Chapters 1–28. Great for finals prep." },
  { id: "t2", campus: "uni-tuebingen", title: "Desk lamp + USB hub", price: 19, currency: "€", category: "Electronics", condition: "Like new", seller: "Leon B.", program: "MSc Cognitive Science", verified: true, dist: "Altstadt", location: "Altstadt, Tübingen", img: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)", emoji: "💡", desc: "LED, 3 brightness levels. 4-port USB hub included." },
  { id: "t3", campus: "uni-tuebingen", title: "City bike — 7 gears", price: 95, currency: "€", category: "Transport", condition: "Good", seller: "Hanna K.", program: "BA Philosophy", verified: true, dist: "Weststadt", location: "Weststadt, Tübingen", img: "linear-gradient(135deg, #5a7d52 0%, #2d4127 100%)", emoji: "🚲", desc: "Basket + dynamo lights. Perfect for old town cobblestones." },
  { id: "t4", campus: "uni-tuebingen", title: "KALLAX shelf 4×2", price: 38, currency: "€", category: "Furniture", condition: "Good", seller: "David H.", program: "MSc Physics", verified: true, dist: "Sand", location: "Sand area, Tübingen", img: "linear-gradient(135deg, #c9b89a 0%, #8a7456 100%)", emoji: "🪑", desc: "White, 8 cubes. Must collect — can help disassemble." },

  // ── DHBW Stuttgart ──────────────────────────────────────────
  { id: "d1", campus: "dhbw-stuttgart", title: "Standing desk converter", price: 55, currency: "€", category: "Furniture", condition: "Like new", seller: "Felix R.", program: "BSc Business IT", verified: true, dist: "Rotebühl", location: "Rotebühlplatz, Stuttgart", img: "linear-gradient(135deg, #c9b89a 0%, #8a7456 100%)", emoji: "🪑", desc: "Adjustable height 40–50 cm. Fits 80 cm desk." },
  { id: "d2", campus: "dhbw-stuttgart", title: "Clean Code — Robert Martin", price: 12, currency: "€", category: "Books", condition: "Good", seller: "Sophie W.", program: "BSc Software Engineering", verified: true, dist: "City center", location: "Stuttgart Mitte", img: "linear-gradient(135deg, #2a3b5c 0%, #0e1a2e 100%)", emoji: "📕", desc: "Classic. Some pencil notes on ch. 3–5. No highlights." },
  { id: "d3", campus: "dhbw-stuttgart", title: "Mechanical keyboard — TKL", price: 48, currency: "€", category: "Electronics", condition: "Excellent", seller: "Noah M.", program: "BSc Digital Business", verified: true, dist: "Vaihingen", location: "Stuttgart Vaihingen", img: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)", emoji: "⌨️", desc: "Brown switches, USB-C. Original box. Great for coding." },

  // ── Universität Stuttgart ───────────────────────────────────
  { id: "s1m", campus: "uni-stuttgart", title: "Engineering Mechanics — Hibbeler", price: 25, currency: "€", category: "Books", condition: "Good", seller: "Jonas K.", program: "BSc Mechanical Engineering", verified: true, dist: "Vaihingen Campus", location: "Campus Vaihingen, Stuttgart", img: "linear-gradient(135deg, #2a3b5c 0%, #0e1a2e 100%)", emoji: "📕", desc: "13th edition. Bookmark tabs on key formulas. Useful for exams." },
  { id: "s2m", campus: "uni-stuttgart", title: "Drawing tablet — Wacom S", price: 42, currency: "€", category: "Electronics", condition: "Like new", seller: "Clara N.", program: "MSc Architecture", verified: true, dist: "City campus", location: "Stadtmitte campus, Stuttgart", img: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)", emoji: "🖥", desc: "2 spare nibs, USB cable. Barely used — switched to iPad." },
  { id: "s3m", campus: "uni-stuttgart", title: "Yoga mat + blocks", price: 16, currency: "€", category: "Sports", condition: "Good", seller: "Lena P.", program: "BSc Civil Engineering", verified: true, dist: "Vaihingen", location: "Campus Vaihingen, Stuttgart", img: "linear-gradient(135deg, #c75050 0%, #6e2424 100%)", emoji: "🧘", desc: "Non-slip mat 6mm + 2 cork blocks. Used ~20 times." },
];

const SERVICES = [
  { id: "s1", name: "Tutoring · Statistics & Econometrics", provider: "Julia Castro", program: "MSc Finance · 4th sem", price: 18, unit: "/hour", rating: 4.9, reviews: 47, tags: ["Statistics", "R", "SPSS"], avail: "Mon–Thu · evenings", verified: true, accent: "lime", desc: "1:1 or pair sessions. Own materials. Pre-exam reviews." },
  { id: "s2", name: "Gym partner · Pull/Push/Legs", provider: "Karim Haddad", program: "BSc Mechatronics", price: 0, unit: "trade", rating: 4.8, reviews: 19, tags: ["Hypertrophy", "Mornings"], avail: "Tue/Thu/Sat 7am", verified: true, accent: "yale", desc: "PPL routine · 6 days. Looking for a consistent partner. Reutlingen Süd gym." },
  { id: "s3", name: "UI/UX Design · Freelance", provider: "Anna Weber", program: "MSc Digital Industrial Mgmt", price: 28, unit: "/hour", rating: 5.0, reviews: 31, tags: ["Figma", "Webflow", "ES/DE/EN"], avail: "Project · 1–4 weeks", verified: true, accent: "lime", desc: "Landing pages, dashboards, prototypes. Portfolio in profile." },
  { id: "s4", name: "German lessons · A1–B2", provider: "Sebastian König", program: "MA Linguistics", price: 22, unit: "/hour", rating: 4.9, reviews: 62, tags: ["Conversation", "TestDaF"], avail: "Online · flex", verified: true, accent: "yale", desc: "Stuttgart native. Plan tailored to your level and goal." },
  { id: "s5", name: "Shared move with van", provider: "Pablo Gimenez", program: "MSc Operations Mgmt", price: 35, unit: "/trip", rating: 4.7, reviews: 24, tags: ["Van", "2 people"], avail: "Sat–Sun", verified: true, accent: "neutral", desc: "Wohnheim swaps, IKEA runs, campus transfers." },
  { id: "s6", name: "Video & Reels editing", provider: "Mateo Duarte", program: "BSc Logistics Mgmt", price: 15, unit: "/clip", rating: 4.8, reviews: 14, tags: ["Premiere", "CapCut"], avail: "Online · 48h", verified: true, accent: "lime", desc: "Reels for thesis, personal brand or events. Subtitles included." },
];

const EVENTS = [
  { id: "e1", date: { d: "29", m: "APR", time: "20:00" }, title: "Welcome Drinks · Spring Intake", host: "Student Council", where: "Café Nepomuk · Reutlingen", attendees: 142, capacity: 200, tag: "Social", color: "lime", desc: "First meet-up of the semester. Discounted drinks if you bring your student ID." },
  { id: "e2", date: { d: "02", m: "MAY", time: "18:30" }, title: "Study Group · Quantitative Methods", host: "MSc Finance Cohort", where: "Library · Room 3.04", attendees: 12, capacity: 16, tag: "Study", color: "yale", desc: "Collaborative review of set 4. Bring your questions." },
  { id: "e3", date: { d: "04", m: "MAY", time: "19:00" }, title: "Pitch Night · Founders @ ESB", host: "ESB Entrepreneurship Club", where: "Aula Magna · Building 9", attendees: 88, capacity: 120, tag: "Networking", color: "lime", desc: "8 pitches, 5 min each. Jury: 3 alumni who raised seed in 2025." },
  { id: "e4", date: { d: "07", m: "MAY", time: "10:00" }, title: "Workshop · Notion for thesis", host: "Crossway × Notion", where: "Coworking · Plaza", attendees: 34, capacity: 40, tag: "Workshop", color: "yale", desc: "Thesis template with timeline, reading and citations. Coffee included." },
  { id: "e5", date: { d: "10", m: "MAY", time: "22:00" }, title: "Spring Bash · Campus Open Air", host: "AStA Reutlingen", where: "Campus Plaza", attendees: 410, capacity: 600, tag: "Party", color: "lime", desc: "DJ set + food trucks. Entry with university email." },
  { id: "e6", date: { d: "14", m: "MAY", time: "17:30" }, title: "Career Talk · Consulting in DACH", host: "Career Services", where: "Room 2.12", attendees: 56, capacity: 80, tag: "Career", color: "yale", desc: "Talk with 4 alumni at BCG, Roland Berger and boutique firms." },
];

const REVIEWS = [
  { id: "r1", target: "Julia Castro", role: "Tutoring · Statistics", rating: 5, when: "3 days ago", author: "Andres P.", program: "BSc Int. Business", text: "Went from 3.7 to 1.7 on the midterm. Super structured and patient with the R setup." },
  { id: "r2", target: "Anna Weber", role: "UI/UX Design", rating: 5, when: "1 week ago", author: "Felix B.", program: "MSc Operations Mgmt", text: "Clean design, delivered before the deadline. Great back-and-forth on copy." },
  { id: "r3", target: "Pablo Gimenez", role: "Moving", rating: 4, when: "2 weeks ago", author: "Emilia R.", program: "BSc Logistics Mgmt", text: "On time, everything arrived intact. One star off only for the check-in wait." },
];

const CHAT = [
  { id: "c1", from: "Lucia F.", program: "BSc Int. Business", last: "Available from Saturday — should I send the Wohnheim PIN?", time: "12:42", unread: 2, item: "IKEA Linnmon Desk", verified: true, color: "#c9b89a" },
  { id: "c2", from: "Julia Castro", program: "MSc Finance", last: "Confirming Thursday's 18:00 slot at the library.", time: "11:08", unread: 0, item: "Tutoring · Statistics", verified: true, color: "#c9dc5e" },
  { id: "c3", from: "Karim H.", program: "BSc Mechatronics", last: "Tomorrow 7am — meet at dorm 12?", time: "Yesterday", unread: 0, item: "Gym partner", verified: true, color: "#5a7d52" },
];

const CHAT_THREAD = [
  { id: "t1", from: "me", text: "Hi Lucia! Is the desk still available?", time: "12:38" },
  { id: "t2", from: "her", text: "Hey! Yes, totally. I'm freeing it up Saturday the 4th.", time: "12:39" },
  { id: "t3", from: "me", text: "Perfect. Is €45 firm, or some room if I pick it up myself?", time: "12:40" },
  { id: "t4", from: "her", text: "If you pick it up I'll do €40. Want the chair? I can throw it in for €15 more.", time: "12:41" },
  { id: "t5", from: "her", text: "Available from Saturday — should I send the Wohnheim PIN?", time: "12:42" },
];

const CATEGORIES = ["All", "Furniture", "Books", "Electronics", "Transport", "Kitchen", "Notes", "Sports"];

const CAMPUSES = [
  { id: "esb-reutlingen",   label: "ESB · Reutlingen" },
  { id: "uni-tuebingen",    label: "Universität Tübingen" },
  { id: "dhbw-stuttgart",   label: "DHBW Stuttgart" },
  { id: "uni-stuttgart",    label: "Universität Stuttgart" },
];

Object.assign(window, { MARKETPLACE, SERVICES, EVENTS, REVIEWS, CHAT, CHAT_THREAD, CATEGORIES, CAMPUSES });
