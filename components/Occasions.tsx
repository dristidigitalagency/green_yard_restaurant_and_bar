"use client";

const occasions = [
  {
    id: "birthday",
    emoji: "🎂",
    title: "Birthday Parties",
    desc: "Make their day magical with lush garden decor, custom cakes & joyful vibes under open sky.",
  },
  {
    id: "bride-to-be",
    emoji: "💐",
    title: "Bride to Be",
    desc: "Celebrate the pre-wedding glow with an elegant garden setup perfect for the bride and her crew.",
  },
  {
    id: "teej",
    emoji: "🪔",
    title: "Teej Celebration",
    desc: "Revel in the spirit of Teej with traditional decor, festive food & a vibrant open-air atmosphere.",
  },
  {
    id: "engagement",
    emoji: "💍",
    title: "Engagements",
    desc: "Say yes surrounded by nature — a romantic, intimate setting for your most cherished moment.",
  },
  {
    id: "meetings",
    emoji: "🤝",
    title: "Corporate Meetings",
    desc: "Fresh air, green surroundings and excellent service — the ideal backdrop for productive gatherings.",
  },
  {
    id: "anniversary",
    emoji: "🥂",
    title: "Anniversaries",
    desc: "Relive your story in our garden paradise with candlelit dinners and personalized touches.",
  },
];

export default function Occasions() {
  return (
    <section
      id="occasions"
      style={{
        background: "linear-gradient(160deg, var(--green-deep) 0%, #0f2813 50%, var(--green-mid) 100%)",
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative large text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(8rem,20vw,18rem)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.025)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        CELEBRATE
      </div>

      <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p
            className="font-script"
            style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", color: "var(--gold-light)" }}
          >
            Every Moment Deserves a Beautiful Setting
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2rem,5vw,3.5rem)",
              color: "white",
              marginTop: "0.5rem",
            }}
          >
            Perfect for Every Occasion
          </h2>
          <div
            className="divider-ornament"
            style={{ marginTop: "1.25rem", maxWidth: "360px", margin: "1.25rem auto 0", color: "var(--gold)" }}
          >
            <span style={{ fontSize: "1.1rem" }}>✦</span>
          </div>
          <p
            style={{
              color: "rgba(183,228,199,0.8)",
              fontFamily: "'Lato',sans-serif",
              fontSize: "1rem",
              marginTop: "1rem",
              maxWidth: "560px",
              margin: "1rem auto 0",
              lineHeight: 1.7,
            }}
          >
            Kathmandu&apos;s most peaceful retreat — the green yard that turns gatherings into lasting memories.
          </p>
        </div>

        {/* Occasion Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {occasions.map((o) => (
            <div
              key={o.id}
              id={`occasion-${o.id}`}
              className="occasion-card"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(82,183,136,0.2)",
                borderRadius: "20px",
                padding: "2rem 1.75rem",
                cursor: "default",
              }}
            >
              <div
                style={{
                  fontSize: "2.8rem",
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                {o.emoji}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.4rem",
                  color: "white",
                  marginBottom: "0.75rem",
                }}
              >
                {o.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Lato',sans-serif",
                  fontSize: "0.93rem",
                  color: "rgba(183,228,199,0.8)",
                  lineHeight: 1.7,
                }}
              >
                {o.desc}
              </p>
              <a
                href="#booking"
                style={{
                  display: "inline-block",
                  marginTop: "1.25rem",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--gold-light)",
                  textDecoration: "none",
                  fontFamily: "'Lato',sans-serif",
                  borderBottom: "1px solid rgba(232,201,106,0.4)",
                  paddingBottom: "2px",
                  transition: "color 0.2s",
                }}
              >
                Book Now →
              </a>
            </div>
          ))}
        </div>

        {/* Big CTA */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a href="#booking" className="btn-gold">
            🌿 Plan Your Celebration
          </a>
        </div>
      </div>
    </section>
  );
}
