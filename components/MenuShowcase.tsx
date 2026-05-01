"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type MenuItem = {
  name: string;
  desc?: string;
  price: string;
  tag?: string;
  plate: number; // 1-5
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
    id: "combo",
    label: "Combo",
    emoji: "🎁",
    items: [
      {
        name: "Greenyard Combo Package",
        desc: "Chicken Biryani / Mutton Pakku / Tofu Chilly / MoMo Fry 6pcs, Wai Wai Sadeko / Green Salad / Jumbo Coke or Real Juice — 2 Glass",
        price: "NPR 2,750",
        tag: "Best Value",
        plate: 1,
      },
    ],
  },
  {
    id: "sandwich",
    label: "Sandwich",
    emoji: "🥪",
    items: [
      {
        name: "Club Sandwich",
        desc: "Lettuce, Tomato, Onion, Chicken, Crispy Bacon, Egg & Cheese, Coleslaw",
        price: "NPR 550",
        tag: "Popular",
        plate: 2,
      },
      {
        name: "Fresh Veg & Cheese Sandwich",
        desc: "Served on White Bread — Lettuce, Tomato, Onion, Cucumber & Sliced Cheese",
        price: "NPR 375",
        plate: 3,
      },
      {
        name: "Grilled Ham & Cheese Sandwich",
        desc: "Served on White Bread",
        price: "NPR 350",
        plate: 4,
      },
    ],
  },
  {
    id: "burger",
    label: "Burger",
    emoji: "🍔",
    items: [
      {
        name: "Crunchy Chicken Burger",
        desc: "All Burgers served with French Fries & Sriracha Mayo",
        price: "NPR 575",
        tag: "Chef's Pick",
        plate: 1,
      },
      {
        name: "Hawaiian Chicken Burger",
        desc: "Burger Bun, House Dressing, Lettuce, Onion, Tomato, Chicken Patty, Ham, Pineapple, Cheddar Cheese",
        price: "NPR 575",
        plate: 2,
      },
      {
        name: "BBQ Buff / Chicken Burger",
        desc: "Burger Bun, House Dressing, Lettuce, Tomato, Onion, Patty, BBQ Sauce, Cheddar Cheese",
        price: "NPR 530",
        plate: 3,
      },
      {
        name: "Crispy Chicken Burger",
        desc: "Served with French Fries & Sriracha Mayo",
        price: "NPR 490",
        plate: 4,
      },
      {
        name: "Veg Burger",
        desc: "Served with French Fries & Sriracha Mayo",
        price: "NPR 400",
        plate: 5,
      },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    items: [
      { name: "Mushroom Broccoli Pizza", price: "NPR 785", plate: 1 },
      {
        name: "Pizza California",
        desc: "Veggies, Lettuces, Italian Herbs",
        price: "NPR 850",
        plate: 2,
      },
      {
        name: "Meat Lovers",
        desc: "Bacon, Sausage, Grilled Chicken, Egg, Ham",
        price: "NPR 1,095",
        tag: "Popular",
        plate: 3,
      },
      { name: "Chilly Chicken Pizza", price: "NPR 960", plate: 4 },
      { name: "BBQ Pizza", price: "NPR 995", plate: 5 },
      { name: "Pepperoni Pizza", price: "NPR 1,050", plate: 1 },
      {
        name: "Greenyard Special Pizza (Large)",
        price: "NPR 1,399",
        tag: "Must Try",
        plate: 2,
      },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    emoji: "🍝",
    items: [
      {
        name: "Bolognese",
        desc: "All Pasta served with Garlic Bread",
        price: "NPR 650",
        plate: 1,
      },
      {
        name: "Carbonara",
        desc: "Mushroom / Chicken / Bacon",
        price: "NPR 690",
        tag: "Popular",
        plate: 2,
      },
      {
        name: "Alla Pastora",
        desc: "Shiitake Mushroom & Bacon",
        price: "NPR 575",
        plate: 3,
      },
      {
        name: "Arrabbiata",
        desc: "Veg / Non-Veg",
        price: "NPR 525",
        plate: 4,
      },
      {
        name: "Baked Macaroni",
        desc: "Kids Pasta",
        price: "NPR 595",
        plate: 5,
      },
    ],
  },
  {
    id: "main",
    label: "Main Course",
    emoji: "🍽️",
    items: [
      {
        name: "Crumb Fried Fish & Chips",
        desc: "Served with French Fries, Tartar Sauce & Lemon Wedge",
        price: "NPR 625",
        plate: 1,
      },
      {
        name: "Grilled Fish",
        desc: "Served with Sautéed Veg, Side Salad & Lemon Butter Sauce",
        price: "NPR 750",
        plate: 2,
      },
      {
        name: "Grilled Chicken Leg / Breast",
        desc: "Served with Sautéed Veg, Rosemary Potato & Red Wine Sauce",
        price: "NPR 850 / 800",
        tag: "Chef's Pick",
        plate: 3,
      },
      {
        name: "Chicken Cordon Bleu",
        desc: "Served with Sautéed Spaghetti & Creamy Cheese Sauce",
        price: "NPR 895",
        plate: 4,
      },
      {
        name: "Pork Chop",
        desc: "Served with Parsley Mashed, Sautéed Veg & Red Wine Apple Sauce",
        price: "NPR 950",
        plate: 5,
      },
      {
        name: "Cottage Cheese Steak",
        desc: "Rice with Veggies",
        price: "NPR 795",
        plate: 1,
      },
      { name: "Chicken Sizzler", price: "NPR 850", tag: "Popular", plate: 2 },
      { name: "Pork Belly", price: "NPR 950", plate: 3 },
      {
        name: "Manchurian with Rice",
        desc: "Veg / Chicken",
        price: "NPR 475 / 575",
        plate: 4,
      },
      {
        name: "Red / Green / Yellow Curry with Rice",
        desc: "Veg / Chicken / Shrimp",
        price: "NPR 500 / 575 / 700",
        plate: 5,
      },
    ],
  },
  {
    id: "dessert",
    label: "Dessert",
    emoji: "🍫",
    items: [
      { name: "Chocolate Walnut Brownies", price: "NPR 350", tag: "Must Try", plate: 1 },
      { name: "Fresh Seasonal Fruits with Yogurt", price: "NPR 395", plate: 2 },
      { name: "Smoothie (Seasonal Fruits)", price: "NPR 550", plate: 3 },
    ],
  },
  {
    id: "barista",
    label: "Barista",
    emoji: "☕",
    items: [
      { name: "Single Espresso", price: "NPR 120", plate: 1 },
      { name: "Doppio", price: "NPR 150", plate: 2 },
      { name: "Affogato", price: "NPR 185", plate: 3 },
      { name: "Americano (Single / Double)", price: "NPR 150 / 175", plate: 4 },
      { name: "Cappuccino", price: "NPR 195", tag: "Popular", plate: 5 },
      { name: "Café Latte", price: "NPR 195", plate: 1 },
      { name: "Honey Latte", price: "NPR 230", plate: 2 },
      { name: "Café Mocha", price: "NPR 250", plate: 3 },
      { name: "Hot Chocolate", price: "NPR 250", plate: 4 },
      { name: "Iced Americano", price: "NPR 195", plate: 5 },
      { name: "Iced Cappuccino", price: "NPR 230", plate: 1 },
      { name: "Iced Latte", price: "NPR 230", plate: 2 },
      { name: "Blended Mocha", price: "NPR 275", plate: 3 },
      { name: "Kiwi Lime Refresher", price: "NPR 250", plate: 4 },
      { name: "Mint Lime Refresher", price: "NPR 250", plate: 5 },
      { name: "Peach / Lemon / Apple Iced Tea", price: "NPR 260", plate: 1 },
      { name: "Homemade Lemonade", price: "NPR 150", plate: 2 },
      { name: "Fresh Mint Lemonade", price: "NPR 250", plate: 3 },
      { name: "Fresh Lime Soda", price: "NPR 165", plate: 4 },
      { name: "Fresh Fruit Lassi / Plain Lassi", price: "NPR 250 / 230", plate: 5 },
      { name: "Milk Shakes (Vanilla / Strawberry / Chocolate / Banana)", price: "NPR 250", plate: 1 },
      { name: "Smoothies (Strawberry / Blueberry)", price: "NPR 290", plate: 2 },
      { name: "Thick Shakes (Espresso / Vanilla / Chocolate / Strawberry)", price: "NPR 290", plate: 3 },
      { name: "Blended Oreo / Snickers / KitKat", price: "NPR 350", tag: "Must Try", plate: 4 },
      { name: "Fresh Juice (Watermelon / Orange / Pomegranate)", price: "NPR 210", plate: 5 },
      { name: "Real Juice (Glass)", price: "NPR 150", plate: 1 },
      { name: "Black Tip Tea", price: "NPR 165 / 290", plate: 2 },
      { name: "Green Pearl Tea", price: "NPR 175 / 300", plate: 3 },
      { name: "Silver / Golden Tea", price: "NPR 190 / 320", plate: 4 },
      { name: "White Tip Tea", price: "NPR 175 / 290", plate: 5 },
      { name: "Masala Tea Barista", price: "NPR 70 / 180", plate: 1 },
    ],
  },
  {
    id: "bar",
    label: "Bar",
    emoji: "🥃",
    items: [
      { name: "Johnnie Walker Double Black Label (30ml)", price: "NPR 625", tag: "Premium", plate: 1 },
      { name: "Johnnie Walker Black Label (30ml)", price: "NPR 490", plate: 2 },
      { name: "Chivas Regal 12Yr (30ml)", price: "NPR 490", plate: 3 },
      { name: "Glen Livet 12 Years (30ml)", price: "NPR 950", tag: "Single Malt", plate: 4 },
      { name: "Glen Fiddich 12 Years (30ml)", price: "NPR 850", plate: 5 },
      { name: "Jim Beam (30ml)", price: "NPR 450", plate: 1 },
      { name: "Jack Daniel's (30ml)", price: "NPR 450", plate: 2 },
      { name: "Jameson (30ml)", price: "NPR 450", plate: 3 },
      { name: "Absolut Vodka (30ml)", price: "NPR 375", plate: 4 },
      { name: "Bombay Sapphire Gin (30ml)", price: "NPR 950", plate: 5 },
      { name: "Beefeater Gin (30ml)", price: "NPR 850", plate: 1 },
      { name: "Captain Morgan Spiced (30ml)", price: "NPR 350", plate: 2 },
      { name: "Olmeca Silver / Gold Tequila (30ml)", price: "NPR 550", plate: 3 },
      { name: "Jacob's Creek Merlot Shiraz (Glass)", price: "NPR 1,000", plate: 4 },
      { name: "Jacob's Creek Cabernet Sauvignon (Glass)", price: "NPR 1,000", plate: 5 },
      { name: "Jacob's Creek Chardonnay (Glass)", price: "NPR 1,000", plate: 1 },
      { name: "Old Darbar Reserve (30ml)", price: "NPR 200", plate: 2 },
      { name: "Old Darbar Black Chimney (30ml)", price: "NPR 250", plate: 3 },
      { name: "The Signature Rare (30ml)", price: "NPR 195", plate: 4 },
      { name: "Khukuri Rum (30ml)", price: "NPR 175", plate: 5 },
      { name: "Baileys (30ml)", price: "NPR 500", plate: 1 },
      { name: "Kahlua (30ml)", price: "NPR 500", plate: 2 },
      { name: "Aperol (30ml)", price: "NPR 600", plate: 3 },
      { name: "Barasinghe Pilsner 750ml", price: "NPR 625", tag: "Beer", plate: 4 },
      { name: "Gorkha Strong", price: "NPR 575", plate: 5 },
      { name: "Carlsberg", price: "NPR 650", plate: 1 },
      { name: "Tuborg", price: "NPR 625", plate: 2 },
    ],
  },
  {
    id: "cocktails",
    label: "Cocktails",
    emoji: "🍹",
    items: [
      { name: "Margarita", desc: "Tequila, Triple Sec, Lemon Juice", price: "NPR 800", tag: "Classic", plate: 1 },
      { name: "Cosmopolitan", desc: "Vodka, Triple Sec, Cranberry Juice, Lemon Juice", price: "NPR 800", plate: 2 },
      { name: "The Signature Mojito", desc: "White Rum, Mint Leaf, Lime Wedge, Sugar", price: "NPR 900", tag: "Signature", plate: 3 },
      { name: "Piña Colada", desc: "White Rum, Pineapple Juice, Coconut Cream", price: "NPR 800", plate: 4 },
      { name: "Long Island Iced Tea", desc: "Rum, Vodka, Gin, Tequila, Triple Sec, Lemon Juice, Coke", price: "NPR 800", plate: 5 },
      { name: "Espresso Martini", desc: "Espresso, Vodka, Kahlua", price: "NPR 950", plate: 1 },
      { name: "Negroni", desc: "Gin, Sweet Vermouth, Campari", price: "NPR 750", plate: 2 },
      { name: "White Russian", desc: "Vodka, Kahlua, Heavy Cream", price: "NPR 950", plate: 3 },
      { name: "Old Fashioned", desc: "Jim Beam, Angostura Bitters, Brown Sugar, Orange Peel", price: "NPR 700", plate: 4 },
      { name: "Whisky Sour", desc: "Jim Beam, Sugar, Lemon, Egg White, Dash of Bitters", price: "NPR 950", plate: 5 },
      { name: "Titaura Yard", desc: "Titaura, Vodka, Mango Juice, Lemon, Sugar", price: "NPR 700", tag: "Local Fav", plate: 1 },
      { name: "Gin Mash", desc: "Gin, Orange Juice, Pineapple Juice, Lemon, Sugar, Jalapeño, Mint", price: "NPR 600", plate: 2 },
      { name: "Virgin Mojito", desc: "Mocktail", price: "NPR 400", plate: 3 },
      { name: "Virgin Piña Colada", desc: "Mocktail", price: "NPR 450", plate: 4 },
      { name: "Mango Titaura", desc: "Mocktail", price: "NPR 450", plate: 5 },
      { name: "Purple Haze", desc: "Mocktail", price: "NPR 450", plate: 1 },
      { name: "Fruit Punch", desc: "Mocktail", price: "NPR 450", plate: 2 },
      { name: "Blue Angel", desc: "Mocktail", price: "NPR 500", plate: 3 },
      { name: "Shisha / Hookah", price: "NPR 600", tag: "Experience", plate: 4 },
    ],
  },
];

const tagColors: Record<string, string> = {
  "Best Value": "#c9a84c",
  "Popular": "#52b788",
  "Chef's Pick": "#2d6a4f",
  "Must Try": "#8b6345",
  "Premium": "#7a3c88",
  "Single Malt": "#5c3d2e",
  "Classic": "#2d6a4f",
  "Signature": "#c9a84c",
  "Local Fav": "#e8614a",
  "Beer": "#c9a84c",
  "Experience": "#2d6a4f",
};

export default function MenuShowcase() {
  const [catIdx, setCatIdx] = useState(0);
  const [itemIdx, setItemIdx] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cat = categories[catIdx];
  const dish = cat.items[itemIdx];

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (animating) return;
      const len = cat.items.length;
      const next =
        dir === "next"
          ? (itemIdx + 1) % len
          : (itemIdx - 1 + len) % len;
      setSlideDir(dir === "next" ? "left" : "right");
      setAnimating(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setItemIdx(next);
        setSlideDir(null);
        setAnimating(false);
      }, 420);
    },
    [animating, cat.items.length, itemIdx]
  );

  const switchCategory = (idx: number) => {
    if (idx === catIdx) return;
    setCatIdx(idx);
    setItemIdx(0);
    setSlideDir(null);
    setAnimating(false);
  };

  return (
    <section id="menu" style={{ padding: "6rem 0", background: "linear-gradient(180deg,var(--cream) 0%,#f0e8d5 100%)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-subtitle">Culinary Delights</p>
          <h2 className="section-title">Our Full Menu</h2>
          <div className="divider-ornament" style={{ marginTop: "1.25rem", maxWidth: "360px", margin: "1.25rem auto 0" }}>
            <span style={{ fontSize: "1.2rem" }}>✦</span>
          </div>
          <p style={{ fontFamily: "'Lato',sans-serif", color: "var(--text-light)", marginTop: "1rem", fontSize: "1rem" }}>
            From garden-fresh bites to premium cocktails — every flavour, every occasion.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="menu-cat-tabs">
          {categories.map((c, i) => (
            <button
              key={c.id}
              id={`menu-cat-${c.id}`}
              className={`menu-cat-tab${catIdx === i ? " active" : ""}`}
              onClick={() => switchCategory(i)}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Main card */}
        <div className="menu-card paper-card">

          {/* LEFT: Plate */}
          <div className="menu-plate-panel">
            {/* Decorative rings */}
            <div className="menu-ring menu-ring-lg" />
            <div className="menu-ring menu-ring-sm" />

            {/* Plate with slide animation */}
            <div
              key={`${catIdx}-${itemIdx}`}
              className={`menu-plate-wrap${slideDir === "left" ? " slide-out-left" : slideDir === "right" ? " slide-out-right" : " slide-in"}`}
            >
              <Image
                src={p(dish.plate - 1)}
                alt={dish.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="340px"
                priority={itemIdx === 0}
              />
            </div>

            {/* Counter */}
            <div className="menu-counter">
              {String(itemIdx + 1).padStart(2, "0")} / {String(cat.items.length).padStart(2, "0")}
            </div>

            {/* Category badge */}
            <div className="menu-cat-badge">
              {cat.emoji} {cat.label}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="menu-info-panel">
            {/* Tag */}
            {dish.tag && (
              <span
                className="menu-tag"
                style={{ background: tagColors[dish.tag] || "var(--green-mid)" }}
              >
                {dish.tag}
              </span>
            )}

            {/* Name */}
            <h3 className="menu-dish-name" key={`name-${catIdx}-${itemIdx}`}>
              {dish.name}
            </h3>

            <div style={{ width: "60px", height: "2px", background: "var(--gold)", borderRadius: "2px", margin: "0.5rem 0 1rem" }} />

            {/* Description */}
            {dish.desc && (
              <p className="menu-dish-desc">{dish.desc}</p>
            )}

            {/* Price */}
            <p className="menu-dish-price">{dish.price}</p>

            {/* Item dots + nav */}
            <div className="menu-nav-row">
              <button
                onClick={() => navigate("prev")}
                disabled={animating}
                id="menu-prev-btn"
                aria-label="Previous dish"
                className="menu-nav-btn outline"
              >
                ←
              </button>

              <div className="menu-dots">
                {cat.items.map((_, i) => (
                  <span
                    key={i}
                    className={`menu-dot${i === itemIdx ? " active" : ""}`}
                    onClick={() => {
                      if (i === itemIdx || animating) return;
                      setSlideDir(i > itemIdx ? "left" : "right");
                      setAnimating(true);
                      setTimeout(() => { setItemIdx(i); setSlideDir(null); setAnimating(false); }, 420);
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate("next")}
                disabled={animating}
                id="menu-next-btn"
                aria-label="Next dish"
                className="menu-nav-btn filled"
              >
                →
              </button>
            </div>

            {/* Reservation CTA */}
            <a href="#booking" className="btn-gold" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
              🌿 Book a Table
            </a>
          </div>
        </div>

        {/* Mini item list for current category */}
        <div className="menu-mini-list">
          {cat.items.map((item, i) => (
            <button
              key={i}
              className={`menu-mini-item${i === itemIdx ? " active" : ""}`}
              onClick={() => {
                if (i === itemIdx || animating) return;
                setSlideDir(i > itemIdx ? "left" : "right");
                setAnimating(true);
                setTimeout(() => { setItemIdx(i); setSlideDir(null); setAnimating(false); }, 420);
              }}
            >
              <span className="menu-mini-name">{item.name}</span>
              <span className="menu-mini-price">{item.price}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
