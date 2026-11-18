const CATS = ["All", "Cars", "Electronics", "Rentals", "Jobs", "Furniture", "Phones"];

const LISTINGS = [
  { id: "swift", cat: "Cars", price: "₹4,80,000", title: "2019 Maruti Swift VXi, single owner", place: "Kothrud", time: "2 hours ago", views: 184, seller: "Rohan Kulkarni", since: "2023", phone: "+91 98765 43210",
    body: "Bought new in 2019 and driven mostly on weekends — 41,000 km on the clock, all servicing done at the authorised centre with records in the folder. New tyres in March, insurance valid until next August. Small scuff on the rear bumper that I have not bothered to fix, visible in the photos. Selling because I have moved to a company car.",
    specs: [{ k: "Year", v: "2019" }, { k: "Kilometres", v: "41,000 km" }, { k: "Fuel", v: "Petrol" }, { k: "Transmission", v: "Manual" }, { k: "Owners", v: "First" }] },
  { id: "macbook", cat: "Electronics", price: "₹72,000", title: "MacBook Air M2, 16 GB, boxed", place: "Baner", time: "5 hours ago", views: 302, seller: "Aditi Rane", since: "2021", phone: "+91 91234 56780",
    body: "Two years old, used for design work and always on a stand with an external keyboard, so the body and keys are clean. Battery health 91 percent. Comes with the original box, charger and a sleeve. Screen has no scratches. Upgrading to a Pro, otherwise I would have kept it.",
    specs: [{ k: "Chip", v: "Apple M2" }, { k: "Memory", v: "16 GB" }, { k: "Storage", v: "512 GB SSD" }, { k: "Battery health", v: "91%" }, { k: "Warranty", v: "Expired" }] },
  { id: "flat", cat: "Rentals", price: "₹28,000/mo", title: "2 BHK on rent, furnished, Viman Nagar", place: "Viman Nagar", time: "yesterday", views: 517, seller: "Sameer Joshi", since: "2020", phone: "+91 99887 76655",
    body: "Sixth floor, east facing, 940 sq ft carpet. Fully furnished — beds, wardrobes, sofa, fridge, washing machine and two ACs. Covered parking for one car, lift and backup power. Society is quiet and walkable to the airport road. Eleven month agreement, two months deposit, no brokerage.",
    specs: [{ k: "Configuration", v: "2 BHK" }, { k: "Carpet area", v: "940 sq ft" }, { k: "Furnishing", v: "Fully furnished" }, { k: "Deposit", v: "₹56,000" }, { k: "Available", v: "1 October" }] },
  { id: "frontend", cat: "Jobs", price: "₹9–14 LPA", title: "Front-end developer, React, 2+ years", place: "Kharadi", time: "yesterday", views: 611, seller: "Nimbus Studio", since: "2022", phone: "+91 20 4567 8900",
    body: "We are a nine-person product studio looking for a front-end developer who is comfortable owning a feature end to end. React, TypeScript and CSS you can reason about. You will work directly with the two designers, not through tickets. Hybrid — three days in the Kharadi office.",
    specs: [{ k: "Experience", v: "2–5 years" }, { k: "Stack", v: "React, TypeScript" }, { k: "Type", v: "Full time" }, { k: "Mode", v: "Hybrid, 3 days" }, { k: "Notice", v: "30 days preferred" }] },
  { id: "sofa", cat: "Furniture", price: "₹18,500", title: "Three-seater fabric sofa, teak frame", place: "Aundh", time: "2 days ago", views: 143, seller: "Priya Nair", since: "2024", phone: "+91 98111 22334",
    body: "Bought eighteen months ago from a local workshop. Solid teak frame, grey fabric, no sagging and no pet damage. One cushion cover has a faint tea stain on the underside. Dimensions are 72 by 34 inches. You will need to arrange transport — it fits through a standard door with the legs off.",
    specs: [{ k: "Seats", v: "Three" }, { k: "Frame", v: "Teak" }, { k: "Age", v: "18 months" }, { k: "Dimensions", v: "72 × 34 in" }] },
  { id: "pixel", cat: "Phones", price: "₹31,000", title: "Google Pixel 8, 128 GB, unlocked", place: "Hinjawadi", time: "2 days ago", views: 268, seller: "Tanmay Desai", since: "2022", phone: "+91 90000 11223",
    body: "Used with a case and screen protector since day one, so there are no marks on the glass or frame. Battery is healthy and it holds a full day easily. Original charger and box included. Factory reset and ready to go. Switching to a work-issued iPhone.",
    specs: [{ k: "Storage", v: "128 GB" }, { k: "Condition", v: "Excellent" }, { k: "Age", v: "14 months" }, { k: "Box", v: "Included" }] },
  { id: "royal", cat: "Cars", price: "₹1,35,000", title: "Royal Enfield Classic 350, 2021", place: "Wakad", time: "3 days ago", views: 421, seller: "Imran Shaikh", since: "2019", phone: "+91 97654 32100",
    body: "12,800 km, mostly highway. Serviced at the company workshop every time, bills available. Stock exhaust kept aside if you prefer it; currently has a legal aftermarket one. New chain sprocket set and battery this year. Minor rust on one footpeg, nothing structural.",
    specs: [{ k: "Year", v: "2021" }, { k: "Kilometres", v: "12,800 km" }, { k: "Engine", v: "349 cc" }, { k: "Owners", v: "First" }] },
  { id: "desk", cat: "Furniture", price: "₹7,200", title: "Standing desk, electric, 120 × 60 cm", place: "Pimple Saudagar", time: "4 days ago", views: 96, seller: "Neha Patil", since: "2023", phone: "+91 96543 21098",
    body: "Two-motor electric frame with a laminate top, height memory for three positions. Lifts smoothly and holds two monitors without wobble. The top has one cable cut-out I drilled myself, cleanly finished. Selling because I am moving cities and cannot take it along.",
    specs: [{ k: "Top size", v: "120 × 60 cm" }, { k: "Height range", v: "72–120 cm" }, { k: "Motors", v: "Dual" }, { k: "Age", v: "2 years" }] }
];

const TILES = [
  { cat: "Cars", label: "Cars & bikes", count: "1,240", glyph: "⛋", tint: "rgba(59,91,255,0.09)", ink: "#3B5BFF" },
  { cat: "Electronics", label: "Electronics", count: "2,106", glyph: "▭", tint: "#F0EFEB", ink: "#35353D" },
  { cat: "Rentals", label: "Rentals", count: "684", glyph: "⌂", tint: "#F0EFEB", ink: "#35353D" },
  { cat: "Jobs", label: "Jobs", count: "392", glyph: "◈", tint: "#F0EFEB", ink: "#35353D" }
];

const STEPS = [
  { n: "1", text: "Create an account with your phone number." },
  { n: "2", text: "Post the item with a price and a photo." },
  { n: "3", text: "Buyers call or message you directly." }
];

const MINE = [
  { id: "swift", status: "Live", views: 184 },
  { id: "desk", status: "Live", views: 96 },
  { id: "pixel", status: "Paused", views: 268 },
  { id: "sofa", status: "Sold", views: 143 }
];

const STATUS = {
  Live: { statusInk: "#177245", statusBg: "rgba(23,114,69,0.08)", statusDot: "#22A45D" },
  Paused: { statusInk: "#8A5A00", statusBg: "rgba(138,90,0,0.08)", statusDot: "#D98A00" },
  Sold: { statusInk: "#55555F", statusBg: "rgba(19,19,22,0.06)", statusDot: "#A3A3AC" }
};

export { CATS, LISTINGS, TILES, STEPS, MINE, STATUS };
