"use client";

const reviews = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "The greenery and ambiance at Green Yard is simply unmatched in Kathmandu. We celebrated our anniversary here and it felt like a dream. The food was exceptional!",
    occasion: "Anniversary Dinner",
  },
  {
    name: "Rohan Kc",
    rating: 5,
    text: "Had our team meeting here and it was absolutely refreshing. Fresh air, great coffee, and the staff were incredibly hospitable. Best corporate retreat spot in KTM.",
    occasion: "Team Meeting",
  },
  {
    name: "Sushila Thapa",
    rating: 5,
    text: "We hosted our Teej celebration at Green Yard and it was magical. The open garden setting was perfect and the traditional food was just like home. Highly recommend!",
    occasion: "Teej Celebration",
  },
  {
    name: "Bikash Maharjan",
    rating: 5,
    text: "The momo here are out of this world! Sat in the garden for hours and didn't want to leave. The cocktails are fresh and vibrant just like the surroundings.",
    occasion: "Casual Dining",
  },
];

export default function Testimonials() {
  return (
    <section
      style={{
        padding: "6rem 1.5rem",
        background: `
          radial-gradient(ellipse at 10% 50%, rgba(45,106,79,0.07) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 50%, rgba(201,168,76,0.06) 0%, transparent 50%)
        `,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="section-subtitle">Guest Experiences</p>
          <h2 className="section-title">What Our Guests Say</h2>
          <div
            className="divider-ornament"
            style={{ margin: "1.25rem auto 0", maxWidth: "340px" }}
          >
            <span>✦</span>
          </div>
        </div>

        {/* Review cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className="paper-card testimonial-card"
              style={{ borderRadius: "20px", padding: "2rem" }}
            >
              {/* Stars */}
              <div className="stars" style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
                {"★".repeat(r.rating)}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--text-mid)",
                  marginBottom: "1.5rem",
                }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--green-mid), var(--green-deep))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontFamily: "'Playfair Display',serif",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    flexShrink: 0,
                  }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Lato',sans-serif",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      color: "var(--text-dark)",
                    }}
                  >
                    {r.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Lato',sans-serif",
                      fontSize: "0.78rem",
                      color: "var(--gold)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {r.occasion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
