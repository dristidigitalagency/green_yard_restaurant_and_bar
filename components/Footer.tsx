"use client";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        background: "linear-gradient(160deg, #0a1f0d 0%, #1a3d1f 60%, #2d6a4f 100%)",
        color: "white",
        padding: "4rem 1.5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative leaf */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          fontSize: "20rem",
          opacity: 0.03,
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        🌿
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(82,183,136,0.2)",
          }}
        >
          {/* Brand */}
          <div>
            <div
              className="font-script"
              style={{ fontSize: "2.5rem", color: "white", marginBottom: "0.5rem" }}
            >
              Green Yard
            </div>
            <div
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                color: "rgba(183,228,199,0.7)",
                textTransform: "uppercase",
                fontFamily: "'Lato',sans-serif",
                marginBottom: "1rem",
              }}
            >
              Restaurant &amp; Bar
            </div>
            <p
              style={{
                fontFamily: "'Lato',sans-serif",
                fontSize: "0.9rem",
                color: "rgba(183,228,199,0.75)",
                lineHeight: 1.75,
                maxWidth: "240px",
              }}
            >
              Kathmandu&apos;s most peaceful garden dining experience — where every meal becomes a memory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.1rem",
                marginBottom: "1.25rem",
                color: "var(--gold-light)",
              }}
            >
              Quick Links
            </h4>
            {[
              { label: "About Us", href: "#about" },
              { label: "Our Menu", href: "#menu" },
              { label: "Occasions", href: "#occasions" },
              { label: "Book a Table", href: "#booking" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  display: "block",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(183,228,199,0.75)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(183,228,199,0.75)")}
              >
                → {l.label}
              </a>
            ))}
          </div>

          {/* Opening Hours */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.1rem",
                marginBottom: "1.25rem",
                color: "var(--gold-light)",
              }}
            >
              Opening Hours
            </h4>
            {[
              { label: "Breakfast", time: "7:00 AM – 12:00 PM" },
              { label: "Lunch", time: "12:00 PM – 3:00 PM" },
              { label: "Dinner", time: "6:00 PM – 10:00 PM" },
              { label: "Bar", time: "5:00 PM – 11:00 PM" },
            ].map((h) => (
              <div
                key={h.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(183,228,199,0.75)",
                  marginBottom: "0.55rem",
                  gap: "1rem",
                }}
              >
                <span>{h.label}</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{h.time}</span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.1rem",
                marginBottom: "1.25rem",
                color: "var(--gold-light)",
              }}
            >
              Find Us
            </h4>
            {[
              { icon: "📍", text: "Madhyapur Thimi - 02, Dibyashowari Planning, Manohara Bhaktapur" },
              { icon: "📞", text: "+977 9764595174" },
              { icon: "📧", text: "restaurantgreenyard@gmail.com" },
            ].map((c) => (
              <div
                key={c.text}
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  fontFamily: "'Lato',sans-serif",
                  fontSize: "0.88rem",
                  color: "rgba(183,228,199,0.75)",
                  marginBottom: "0.7rem",
                  alignItems: "flex-start",
                }}
              >
                <span>{c.icon}</span>
                <span>{c.text}</span>
              </div>
            ))}
            <a
              href="#booking"
              style={{
                display: "inline-block",
                marginTop: "0.75rem",
                padding: "0.55rem 1.25rem",
                background: "linear-gradient(135deg,#25d366,#128c4e)",
                color: "white",
                borderRadius: "100px",
                fontSize: "0.8rem",
                fontWeight: 700,
                fontFamily: "'Lato',sans-serif",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Lato',sans-serif",
              fontSize: "0.82rem",
              color: "rgba(183,228,199,0.5)",
            }}
          >
            © {new Date().getFullYear()} Green Yard Restaurant &amp; Bar. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontStyle: "italic",
              fontSize: "0.85rem",
              color: "rgba(183,228,199,0.45)",
            }}
          >
            🌿 Crafted with love in Kathmandu
          </p>
        </div>
      </div>
    </footer>
  );
}
