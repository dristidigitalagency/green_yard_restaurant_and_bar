"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
  tag?: string;
  plate: number;
};

type Category = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

const PLATES = 5;
const p = (i: number) => `/images/plate${((i % PLATES) + PLATES) % PLATES + 1}.png`;

const categories: Category[] = [
  {
    id: "combo", label: "Combo", emoji: "🎁",
    items: [
      { name: "Greenyard Combo Package", desc: "Biryani · Momo Fry · Tofu Chilly · Salad · Coke (2 glass)", price: "NPR 2,750", tag: "Best Value", plate: 1 },
    ],
  },
  {
    id: "sandwich", label: "Sandwich", emoji: "🥪",
    items: [
      { name: "Club Sandwich", desc: "Lettuce, Tomato, Chicken, Bacon, Egg & Cheese, Coleslaw", price: "NPR 550", tag: "Popular", plate: 2 },
      { name: "Fresh Veg & Cheese Sandwich", desc: "White Bread · Lettuce · Tomato · Cucumber · Sliced Cheese", price: "NPR 375", plate: 3 },
      { name: "Grilled Ham & Cheese", desc: "Served on toasted White Bread", price: "NPR 350", plate: 4 },
    ],
  },
  {
    id: "burger", label: "Burgers", emoji: "🍔",
    items: [
      { name: "Crunchy Chicken Burger", desc: "Served with French Fries & Sriracha Mayo", price: "NPR 575", tag: "Popular", plate: 1 },
      { name: "Hawaiian Chicken Burger", desc: "Pineapple · Cheddar · Sweet & Sour Sauce", price: "NPR 575", plate: 2 },
      { name: "BBQ Buff / Chicken Burger", desc: "BBQ Sauce · Cheddar · House Dressing", price: "NPR 530", plate: 3 },
      { name: "Crispy Chicken Burger", desc: "With Fries & Sriracha Mayo", price: "NPR 490", plate: 4 },
      { name: "Veg Burger", desc: "With French Fries & Sriracha Mayo", price: "NPR 400", plate: 5 },
    ],
  },
  {
    id: "pizza", label: "Pizza", emoji: "🍕",
    items: [
      { name: "Greenyard Special Pizza", desc: "Large — House Special Toppings", price: "NPR 1,399", tag: "Signature", plate: 1 },
      { name: "Meat Lovers Pizza", desc: "Bacon · Sausage · Chicken · Egg · Ham", price: "NPR 1,095", tag: "Popular", plate: 2 },
      { name: "Pepperoni Pizza", desc: "Classic Italian Style", price: "NPR 1,050", plate: 3 },
      { name: "Chilly Chicken Pizza", desc: "Spicy Chilly Sauce · Mozzarella", price: "NPR 960", plate: 4 },
      { name: "BBQ Chicken Pizza", desc: "Smoky BBQ · Mozzarella", price: "NPR 975", plate: 5 },
      { name: "Veg Farm Pizza", desc: "Fresh Garden Vegetables · Mozzarella", price: "NPR 850", plate: 1 },
    ],
  },
  {
    id: "pasta", label: "Pasta", emoji: "🍝",
    items: [
      { name: "Carbonara Pasta", desc: "Mushroom / Chicken / Bacon — with Garlic Bread", price: "NPR 690", tag: "Popular", plate: 2 },
      { name: "Bolognese Pasta", desc: "Slow-cooked meat sauce · Garlic Bread", price: "NPR 650", plate: 3 },
      { name: "Alla Pastora", desc: "Shiitake Mushroom & Bacon", price: "NPR 575", plate: 4 },
      { name: "Pesto Pasta", desc: "Basil Pesto · Cherry Tomato · Parmesan", price: "NPR 550", plate: 5 },
    ],
  },
  {
    id: "mains", label: "Mains", emoji: "🍽️",
    items: [
      { name: "Grilled Chicken", desc: "Sautéed Veg · Rosemary Potato · Red Wine Sauce", price: "NPR 850", tag: "Chef's Pick", plate: 1 },
      { name: "Chicken Cordon Bleu", desc: "Sautéed Spaghetti · Creamy Cheese Sauce", price: "NPR 895", plate: 2 },
      { name: "Pork Chop", desc: "Parsley Mash · Sautéed Veg · Red Wine Apple Sauce", price: "NPR 950", plate: 3 },
      { name: "Grilled Fish", desc: "Sautéed Veg · Side Salad · Lemon Butter Sauce", price: "NPR 750", plate: 4 },
      { name: "Chicken Sizzler", desc: "Sizzling hot plate — sauces on the side", price: "NPR 850", tag: "Popular", plate: 5 },
      { name: "Red / Green Curry", desc: "Veg / Chicken / Shrimp — served with Rice", price: "NPR 500–700", plate: 1 },
      { name: "Manchurian with Rice", desc: "Veg / Chicken", price: "NPR 475–575", plate: 2 },
    ],
  },
  {
    id: "drinks", label: "Beverages", emoji: "☕",
    items: [
      { name: "Cappuccino", desc: "House espresso blend with steamed milk foam", price: "NPR 195", tag: "Popular", plate: 3 },
      { name: "Honey Latte", desc: "Espresso · Steamed Milk · Wild Honey", price: "NPR 230", plate: 4 },
      { name: "Café Mocha", desc: "Espresso · Chocolate · Steamed Milk", price: "NPR 250", plate: 5 },
      { name: "Blended Oreo / Snickers / KitKat", desc: "Thick shake — your choice of mix-in", price: "NPR 350", tag: "Must Try", plate: 1 },
      { name: "Fresh Fruit Lassi", desc: "Seasonal blended fruits with yogurt", price: "NPR 250", plate: 2 },
      { name: "Kiwi / Mint Lime Refresher", desc: "House-made refresher", price: "NPR 250", plate: 3 },
      { name: "Fresh Juice", desc: "Watermelon · Orange · Pomegranate", price: "NPR 210", plate: 4 },
    ],
  },
  {
    id: "bar", label: "Bar", emoji: "🥃",
    items: [
      { name: "The Signature Mojito", desc: "White Rum · Mint · Lime · Sugar", price: "NPR 900", tag: "Signature", plate: 5 },
      { name: "Long Island Iced Tea", desc: "Rum · Vodka · Gin · Tequila · Triple Sec · Coke", price: "NPR 800", plate: 1 },
      { name: "Espresso Martini", desc: "Espresso · Vodka · Kahlúa", price: "NPR 950", tag: "Popular", plate: 2 },
      { name: "Titaura Yard", desc: "Titaura · Vodka · Mango Juice · Lemon", price: "NPR 700", tag: "Local Fav", plate: 3 },
      { name: "Old Fashioned", desc: "Jim Beam · Angostura Bitters · Brown Sugar", price: "NPR 700", plate: 4 },
      { name: "Barasinghe Pilsner 750ml", desc: "Craft Nepalese Beer", price: "NPR 625", plate: 5 },
      { name: "JW Black Label (30ml)", desc: "Blended Scotch Whisky", price: "NPR 490", plate: 1 },
    ],
  },
];

const tagColors: Record<string, string> = {
  "Best Value":  "#c9a84c",
  "Popular":     "#52b788",
  "Chef's Pick": "#2d6a4f",
  "Must Try":    "#8b6345",
  "Signature":   "#a07830",
  "Local Fav":   "#c0392b",
};

type Phase = "idle" | "exit" | "enter";

export default function MenuShowcase() {
  const [catIdx, setCatIdx]   = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [phase, setPhase]     = useState<Phase>("idle");
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cat  = categories[catIdx];
  const dish = cat.items[itemIdx];

  const transition = useCallback((nextCat: number, nextItem: number) => {
    if (phase !== "idle") return;
    setPhase("exit");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCatIdx(nextCat);
      setItemIdx(nextItem);
      setPhase("enter");
      timerRef.current = setTimeout(() => setPhase("idle"), 420);
    }, 280);
  }, [phase]);

  const navigate = useCallback((dir: "prev" | "next") => {
    const len = cat.items.length;
    const next = dir === "next"
      ? (itemIdx + 1) % len
      : (itemIdx - 1 + len) % len;
    transition(catIdx, next);
  }, [cat.items.length, catIdx, itemIdx, transition]);

  const switchCategory = (idx: number) => {
    if (idx !== catIdx) transition(idx, 0);
  };

  const pickItem = (i: number) => {
    if (i !== itemIdx) transition(catIdx, i);
  };

  return (
    <section id="menu" className="menu-section">
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="menu-header">
          <p className="section-subtitle" style={{ color: "var(--gold-light)" }}>Culinary Delights</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#fff", lineHeight: 1.15, marginTop: "0.25rem" }}>
            Our Full Menu
          </h2>
          <div style={{ width: "60px", height: "2px", background: "var(--gold)", margin: "1.25rem auto", borderRadius: "2px" }} />
          <p style={{ fontFamily: "'Lato',sans-serif", color: "rgba(183,228,199,0.75)", fontSize: "1rem" }}>
            From garden-fresh bites to premium cocktails — every flavour, every occasion.
          </p>
        </div>

        {/* Category pills */}
        <div className="menu-cats">
          {categories.map((c, i) => (
            <button
              key={c.id}
              id={`menu-cat-${c.id}`}
              className={`menu-cat-pill${catIdx === i ? " active" : ""}`}
              onClick={() => switchCategory(i)}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Spotlight card */}
        <div className={`menu-spotlight phase-${phase}`}>

          {/* Left: Plate */}
          <div className="menu-plate-side">
            <div className="menu-glow-ring" />
            <div className="menu-plate-circle">
              <Image
                src={p(dish.plate - 1)}
                alt={dish.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="300px"
                priority={catIdx === 0 && itemIdx === 0}
              />
            </div>
            <div className="menu-item-counter">
              {String(itemIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(cat.items.length).padStart(2, "0")}
            </div>
            <div className="menu-cat-badge">{cat.emoji} {cat.label}</div>
          </div>

          {/* Right: Info */}
          <div className="menu-info-side">
            {dish.tag && (
              <span
                className="menu-tag-badge"
                style={{ background: tagColors[dish.tag] ?? "var(--green-mid)" }}
              >
                {dish.tag}
              </span>
            )}
            <p className="menu-cat-eyebrow">{cat.emoji} {cat.label}</p>
            <h3 className="menu-item-name">{dish.name}</h3>
            {dish.desc && <p className="menu-item-sub">{dish.desc}</p>}
            <div className="menu-price-row">
              <span className="menu-price">{dish.price}</span>
            </div>

            {/* Nav */}
            <div className="menu-nav">
              <button
                id="menu-prev-btn"
                aria-label="Previous dish"
                className="menu-nav-btn"
                onClick={() => navigate("prev")}
                disabled={phase !== "idle"}
              >←</button>

              <div className="menu-pip-row">
                {cat.items.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Item ${i + 1}`}
                    className={`menu-pip${i === itemIdx ? " on" : ""}`}
                    onClick={() => pickItem(i)}
                  />
                ))}
              </div>

              <button
                id="menu-next-btn"
                aria-label="Next dish"
                className="menu-nav-btn filled"
                onClick={() => navigate("next")}
                disabled={phase !== "idle"}
              >→</button>
            </div>

            <a href="#booking" className="btn-gold" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
              🌿 Book a Table
            </a>
          </div>
        </div>

        {/* Item grid */}
        <div className="menu-grid">
          {cat.items.map((item, i) => (
            <button
              key={i}
              className={`menu-grid-card${i === itemIdx ? " active" : ""}`}
              onClick={() => pickItem(i)}
            >
              <div className="mgc-thumb">
                <Image src={p(item.plate - 1)} alt={item.name} fill style={{ objectFit: "cover" }} sizes="52px" />
              </div>
              <div className="mgc-body">
                <span className="mgc-name">{item.name}</span>
                {item.desc && <span className="mgc-sub">{item.desc}</span>}
              </div>
              <span className="mgc-price">{item.price}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
