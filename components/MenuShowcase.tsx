"use client";
import { useState, useCallback } from "react";
import Image from "next/image";

const dishes = [
  {
    id: 1,
    name: "Steamed Garden Momo",
    category: "Appetizer",
    description:
      "Handcrafted dumplings filled with fresh vegetables and aromatic herbs from our garden, served with house-made tomato chutney and sesame dipping sauce.",
    price: "NPR 350",
    tag: "Chef's Pick",
    image: "/dish-momo.png",
    emoji: "🥟",
  },
  {
    id: 2,
    name: "Nepali Dal Bhat Thali",
    category: "Main Course",
    description:
      "The soul of Nepal on a plate — steamed rice, lentil soup, seasonal vegetables, pickles & a choice of chicken or paneer curry. Unlimited rice refill.",
    price: "NPR 550",
    tag: "Best Seller",
    image: "/dish-thali.png",
    emoji: "🍛",
  },
  {
    id: 3,
    name: "Garden Herb Grilled Chicken",
    category: "Main Course",
    description:
      "Free-range chicken marinated in fresh garden herbs and lemon, grilled over open flame and served with roasted vegetables & garlic butter sauce.",
    price: "NPR 750",
    tag: "Popular",
    image: "/dish-chicken.png",
    emoji: "🍗",
  },
  {
    id: 4,
    name: "Green Yard Signature Cocktail",
    category: "Beverages",
    description:
      "A refreshing garden-inspired blend of fresh mint, cucumber, basil, citrus and your choice of spirit or mocktail base. Served garden-chilled.",
    price: "NPR 450",
    tag: "Must Try",
    image: "/dish-cocktail.png",
    emoji: "🍹",
  },
];

const tagColors: Record<string, string> = {
  "Chef's Pick": "#2d6a4f",
  "Best Seller": "#c9a84c",
  Popular: "#52b788",
  "Must Try": "#8b6345",
};

export default function MenuShowcase() {
  const [current, setCurrent] = useState(0);
  const [rotating, setRotating] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (rotating) return;
      setRotating(true);
      setTimeout(() => {
        setCurrent(next);
        setRotating(false);
      }, 380);
    },
    [rotating]
  );

  const prev = () => goTo((current - 1 + dishes.length) % dishes.length);
  const next = () => goTo((current + 1) % dishes.length);

  const dish = dishes[current];

  return (
    <section
      id="menu"
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p className="section-subtitle">Culinary Delights</p>
        <h2 className="section-title">Our Signature Dishes</h2>
        <div className="divider-ornament" style={{ marginTop: "1.25rem", maxWidth: "360px", margin: "1.25rem auto 0" }}>
          <span style={{ fontSize: "1.2rem" }}>✦</span>
        </div>
        <p
          style={{
            fontFamily: "'Lato',sans-serif",
            color: "var(--text-light)",
            marginTop: "1rem",
            fontSize: "1rem",
          }}
        >
          From mouthwatering starters to hearty mains — every dish is crafted with love &amp; fresh ingredients.
        </p>
      </div>

      {/* Dish card */}
      <div
        className="paper-card"
        style={{
          borderRadius: "24px",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "480px",
        }}
      >
        {/* LEFT: Rotating plate */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem 2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.05)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />

          {/* Plate image */}
          <div
            className={rotating ? "dish-rotating" : ""}
            style={{
              width: "clamp(220px, 30vw, 320px)",
              height: "clamp(220px, 30vw, 320px)",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 6px rgba(255,255,255,0.1)",
              position: "relative",
            }}
          >
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="320px"
            />
          </div>

          {/* Dish number */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              right: "1.5rem",
              fontFamily: "'Playfair Display', serif",
              fontSize: "5rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.06)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            0{current + 1}
          </div>
        </div>

        {/* RIGHT: Dish details */}
        <div
          style={{
            padding: "3rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {/* Tag */}
          <span
            style={{
              display: "inline-block",
              padding: "0.3rem 0.9rem",
              background: tagColors[dish.tag] || "var(--green-mid)",
              color: "white",
              borderRadius: "100px",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            {dish.tag}
          </span>

          {/* Category */}
          <p
            style={{
              fontFamily: "'Lato',sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {dish.emoji} {dish.category}
          </p>

          {/* Name */}
          <h3
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "var(--green-deep)",
              lineHeight: 1.2,
            }}
          >
            {dish.name}
          </h3>

          {/* Divider */}
          <div style={{ width: "60px", height: "2px", background: "var(--gold)", borderRadius: "2px" }} />

          {/* Description */}
          <p
            style={{
              fontFamily: "'Lato',sans-serif",
              fontSize: "0.97rem",
              lineHeight: 1.75,
              color: "var(--text-mid)",
            }}
          >
            {dish.description}
          </p>

          {/* Price */}
          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1.6rem",
              color: "var(--green-mid)",
              fontWeight: 600,
            }}
          >
            {dish.price}
          </p>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
            <button
              onClick={prev}
              disabled={rotating}
              id="menu-prev-btn"
              aria-label="Previous dish"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "2px solid var(--green-mid)",
                background: "transparent",
                color: "var(--green-mid)",
                fontSize: "1.2rem",
                cursor: rotating ? "not-allowed" : "pointer",
                opacity: rotating ? 0.5 : 1,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ←
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              {dishes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to dish ${i + 1}`}
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "100px",
                    background: i === current ? "var(--green-mid)" : "var(--cream-dark)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={rotating}
              id="menu-next-btn"
              aria-label="Next dish"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "none",
                background: "var(--green-mid)",
                color: "white",
                fontSize: "1.2rem",
                cursor: rotating ? "not-allowed" : "pointer",
                opacity: rotating ? 0.5 : 1,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(45,106,79,0.35)",
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* View full menu CTA */}
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <a href="#booking" className="btn-primary">
          🍽️ Reserve Your Table
        </a>
      </div>
    </section>
  );
}
