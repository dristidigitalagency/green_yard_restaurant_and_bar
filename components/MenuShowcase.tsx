"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const plates = [
  "/images/plate1.png",
  "/images/plate2.png",
  "/images/plate3.png",
  "/images/plate4.png",
  "/images/plate5.png",
];

type Item = { name: string; sub?: string; price: string; tag?: string };
type Cat  = { id: string; emoji: string; label: string; items: Item[] };

const menu: Cat[] = [
  {
    id: "starters", emoji: "🥗", label: "Starters",
    items: [
      { name: "Greenyard Combo Package", sub: "Biryani · Momo Fry · Tofu Chilly · Salad · Coke", price: "2,750/-", tag: "Best Value" },
      { name: "Club Sandwich", sub: "Lettuce, Tomato, Chicken, Bacon, Egg, Cheese, Coleslaw", price: "550/-", tag: "Popular" },
      { name: "Fresh Veg & Cheese Sandwich", sub: "White Bread · Lettuce · Tomato · Cucumber · Cheese", price: "375/-" },
      { name: "Grilled Ham & Cheese", sub: "Served on toasted White Bread", price: "350/-" },
    ],
  },
  {
    id: "burgers", emoji: "🍔", label: "Burgers",
    items: [
      { name: "Crunchy Chicken Burger", sub: "Served with French Fries & Sriracha Mayo", price: "575/-", tag: "Chef's Pick" },
      { name: "Hawaiian Chicken Burger", sub: "Pineapple · Cheddar · Sweet & Sour Sauce", price: "575/-" },
      { name: "BBQ Buff / Chicken Burger", sub: "BBQ Sauce · Cheddar Cheese · House Dressing", price: "530/-" },
      { name: "Crispy Chicken Burger", sub: "Served with Fries & Sriracha Mayo", price: "490/-" },
      { name: "Veg Burger", sub: "Served with French Fries & Sriracha Mayo", price: "400/-" },
    ],
  },
  {
    id: "pizza", emoji: "🍕", label: "Pizza & Pasta",
    items: [
      { name: "Greenyard Special Pizza", sub: "Large — House Special Toppings", price: "1,399/-", tag: "Signature" },
      { name: "Meat Lovers Pizza", sub: "Bacon · Sausage · Grilled Chicken · Egg · Ham", price: "1,095/-", tag: "Popular" },
      { name: "Pepperoni Pizza", sub: "Classic Italian Style", price: "1,050/-" },
      { name: "Chilly Chicken Pizza", sub: "Spicy Chilly Sauce · Mozzarella", price: "960/-" },
      { name: "Carbonara Pasta", sub: "Mushroom / Chicken / Bacon — served with Garlic Bread", price: "690/-", tag: "Popular" },
      { name: "Bolognese Pasta", sub: "Slow-cooked meat sauce · Garlic Bread", price: "650/-" },
      { name: "Alla Pastora", sub: "Shiitake Mushroom & Bacon", price: "575/-" },
    ],
  },
  {
    id: "mains", emoji: "🍽️", label: "Mains",
    items: [
      { name: "Grilled Chicken", sub: "Sautéed Veg · Rosemary Potato · Red Wine Sauce", price: "850/-", tag: "Chef's Pick" },
      { name: "Chicken Cordon Bleu", sub: "Sautéed Spaghetti · Creamy Cheese Sauce", price: "895/-" },
      { name: "Pork Chop", sub: "Parsley Mash · Sautéed Veg · Red Wine Apple Sauce", price: "950/-" },
      { name: "Grilled Fish", sub: "Sautéed Veg · Side Salad · Lemon Butter Sauce", price: "750/-" },
      { name: "Chicken Sizzler", sub: "Sizzling hot plate — sauces on the side", price: "850/-", tag: "Popular" },
      { name: "Red / Green / Yellow Curry", sub: "Veg / Chicken / Shrimp — served with Rice", price: "500 – 700/-" },
      { name: "Manchurian with Rice", sub: "Veg / Chicken", price: "475 / 575/-" },
    ],
  },
  {
    id: "drinks", emoji: "☕", label: "Beverages",
    items: [
      { name: "Cappuccino", sub: "House espresso blend with steamed milk foam", price: "195/-", tag: "Popular" },
      { name: "Honey Latte", sub: "Espresso · Steamed Milk · Wild Honey", price: "230/-" },
      { name: "Café Mocha", sub: "Espresso · Chocolate · Steamed Milk", price: "250/-" },
      { name: "Blended Oreo / Snickers / KitKat", sub: "Thick shake — your choice of mix-in", price: "350/-", tag: "Must Try" },
      { name: "Fresh Fruit Lassi", sub: "Seasonal blended fruits with yogurt", price: "250/-" },
      { name: "Kiwi / Mint Lime Refresher", sub: "House-made refresher — choose your flavour", price: "250/-" },
      { name: "Fresh Juice", sub: "Watermelon · Orange · Pomegranate", price: "210/-" },
    ],
  },
  {
    id: "bar", emoji: "🥃", label: "Bar & Cocktails",
    items: [
      { name: "The Signature Mojito", sub: "White Rum · Mint · Lime · Sugar", price: "900/-", tag: "Signature" },
      { name: "Long Island Iced Tea", sub: "Rum · Vodka · Gin · Tequila · Triple Sec · Coke", price: "800/-" },
      { name: "Espresso Martini", sub: "Espresso · Vodka · Kahlúa", price: "950/-", tag: "Popular" },
      { name: "Titaura Yard", sub: "Titaura · Vodka · Mango Juice · Lemon", price: "700/-", tag: "Local Fav" },
      { name: "Old Fashioned", sub: "Jim Beam · Angostura Bitters · Brown Sugar", price: "700/-" },
      { name: "Barasinghe Pilsner 750ml", sub: "Craft Nepalese Beer", price: "625/-" },
      { name: "JW Black Label (30ml)", sub: "Blended Scotch Whisky", price: "490/-" },
    ],
  },
];

const tagColors: Record<string, string> = {
  "Best Value": "#c9a84c",
  "Popular": "#52b788",
  "Chef's Pick": "#2d6a4f",
  "Signature": "#a07830",
  "Must Try": "#8b6345",
  "Local Fav": "#c0392b",
};

type Phase = "idle" | "exit" | "enter";

export default function MenuShowcase() {
  const [catIdx, setCatIdx]   = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [phase, setPhase]     = useState<Phase>("idle");
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cat  = menu[catIdx];
  const item = cat.items[itemIdx];
  const plateIdx = itemIdx % plates.length;

  const transition = (nextCat: number, nextItem: number) => {
    if (phase !== "idle") return;
    setPhase("exit");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCatIdx(nextCat);
      setItemIdx(nextItem);
      setPhase("enter");
      timerRef.current = setTimeout(() => setPhase("idle"), 420);
    }, 280);
  };

  const pickCat  = (i: number) => { if (i !== catIdx) transition(i, 0); };
  const pickItem = (i: number) => { if (i !== itemIdx) transition(catIdx, i); };
  const prev = () => transition(catIdx, (itemIdx - 1 + cat.items.length) % cat.items.length);
  const next = () => transition(catIdx, (itemIdx + 1) % cat.items.length);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <section id="menu" className="menu-section">
      {/* ── Header ── */}
      <div className="menu-header">
        <p className="section-subtitle" style={{ color: "var(--gold-light)" }}>Culinary Delights</p>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,5vw,3.5rem)", color:"#fff", lineHeight:1.15, marginTop:"0.25rem" }}>
          Our Signature Menu
        </h2>
        <div style={{ width:"60px", height:"2px", background:"var(--gold)", margin:"1.25rem auto", borderRadius:"2px" }} />
        <p style={{ fontFamily:"'Lato',sans-serif", color:"rgba(183,228,199,0.75)", fontSize:"1rem" }}>
          Fresh ingredients · Garden ambience · Every flavour crafted with love
        </p>
      </div>

      {/* ── Category pills ── */}
      <div className="menu-cats">
        {menu.map((c, i) => (
          <button
            key={c.id}
            id={`menu-cat-${c.id}`}
            className={`menu-cat-pill${catIdx === i ? " active" : ""}`}
            onClick={() => pickCat(i)}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* ── Spotlight ── */}
      <div className={`menu-spotlight phase-${phase}`}>
        {/* Plate side */}
        <div className="menu-plate-side">
          <div className="menu-glow-ring" />
          <div className="menu-plate-circle">
            <Image
              src={plates[plateIdx]}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="340px"
              priority={catIdx === 0 && itemIdx === 0}
            />
          </div>
          <div className="menu-item-counter">
            {String(itemIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(cat.items.length).padStart(2, "0")}
          </div>
        </div>

        {/* Info side */}
        <div className="menu-info-side">
          {item.tag && (
            <span className="menu-tag-badge" style={{ background: tagColors[item.tag] ?? "var(--green-mid)" }}>
              {item.tag}
            </span>
          )}
          <p className="menu-cat-eyebrow">{cat.emoji} {cat.label}</p>
          <h3 className="menu-item-name">{item.name}</h3>
          {item.sub && <p className="menu-item-sub">{item.sub}</p>}
          <div className="menu-price-row">
            <span className="menu-price">NPR {item.price}</span>
          </div>

          {/* Nav */}
          <div className="menu-nav">
            <button id="menu-prev" aria-label="Previous" className="menu-nav-btn" onClick={prev} disabled={phase !== "idle"}>←</button>
            <div className="menu-pip-row">
              {cat.items.map((_, i) => (
                <button key={i} aria-label={`Item ${i + 1}`} className={`menu-pip${i === itemIdx ? " on" : ""}`} onClick={() => pickItem(i)} />
              ))}
            </div>
            <button id="menu-next" aria-label="Next" className="menu-nav-btn filled" onClick={next} disabled={phase !== "idle"}>→</button>
          </div>

          <a href="#booking" className="btn-gold" style={{ marginTop:"1.5rem", display:"inline-flex" }}>
            🌿 Reserve a Table
          </a>
        </div>
      </div>

      {/* ── Item grid ── */}
      <div className="menu-grid">
        {cat.items.map((it, i) => (
          <button
            key={i}
            className={`menu-grid-card${i === itemIdx ? " active" : ""}`}
            onClick={() => pickItem(i)}
          >
            <div className="mgc-thumb">
              <Image src={plates[i % plates.length]} alt={it.name} fill style={{ objectFit:"cover" }} sizes="80px" />
            </div>
            <div className="mgc-body">
              <span className="mgc-name">{it.name}</span>
              {it.sub && <span className="mgc-sub">{it.sub}</span>}
            </div>
            <span className="mgc-price">NPR {it.price}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
