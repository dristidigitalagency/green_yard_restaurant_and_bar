"use client";
import { useState, FormEvent } from "react";

const WHATSAPP_NUMBER = "9779764595174"; // Replace with real number

interface FormData {
  name: string;
  people: string;
  date: string;
  time: string;
  tableNo: string;
  message: string;
}

export default function BookingCTA() {
  const [form, setForm] = useState<FormData>({
    name: "",
    people: "",
    date: "",
    time: "",
    tableNo: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text =
      `🌿 *Table Booking — Green Yard Restaurant & Bar*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `👥 *Guests:* ${form.people} people\n` +
      `📅 *Date:* ${form.date}\n` +
      `⏰ *Time:* ${form.time}\n` +
      `🪑 *Table No:* ${form.tableNo || "Any available"}\n` +
      (form.message ? `💬 *Note:* ${form.message}\n` : "") +
      `\nLooking forward to a wonderful time at Green Yard! 🌱`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "rgba(255,255,255,0.82)",
    border: "1.5px solid rgba(201,168,76,0.35)",
    borderRadius: "10px",
    fontFamily: "'Lato',sans-serif",
    fontSize: "0.95rem",
    color: "var(--text-dark)",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Lato',sans-serif",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "var(--brown-bark)",
    marginBottom: "0.4rem",
  };

  return (
    <section
      id="booking"
      style={{
        padding: "6rem 1.5rem",
        background: `
          radial-gradient(ellipse at 80% 20%, rgba(45,106,79,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.07) 0%, transparent 50%)
        `,
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-subtitle">Reserve Your Spot</p>
          <h2 className="section-title">Book a Table</h2>
          <div
            className="divider-ornament"
            style={{ margin: "1.25rem auto 0", maxWidth: "340px" }}
          >
            <span>✦</span>
          </div>
          <p
            style={{
              color: "var(--text-light)",
              fontFamily: "'Lato',sans-serif",
              marginTop: "1rem",
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
          >
            Fill in your details and we&apos;ll confirm your booking via WhatsApp. We can&apos;t wait to host you!
          </p>
        </div>

        {/* Form card */}
        <div
          className="paper-card"
          style={{ borderRadius: "24px", padding: "clamp(1.5rem, 4vw, 3rem)" }}
        >
          {/* Decorative top border */}
          <div
            style={{
              height: "4px",
              background: "linear-gradient(to right, var(--green-mid), var(--gold), var(--green-mid))",
              borderRadius: "4px 4px 0 0",
              margin: "-clamp(1.5rem, 4vw, 3rem) -clamp(1.5rem, 4vw, 3rem) 2rem",
            }}
          />

          <form onSubmit={handleSubmit} id="booking-form">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {/* Name */}
              <div>
                <label htmlFor="booking-name" style={labelStyle}>Your Name</label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Shrestha"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* People */}
              <div>
                <label htmlFor="booking-people" style={labelStyle}>Number of Guests</label>
                <select
                  id="booking-people"
                  name="people"
                  required
                  value={form.people}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="" disabled>Select guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                  ))}
                  <option value="10+">10+ (group)</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="booking-date" style={labelStyle}>Date</label>
                <input
                  id="booking-date"
                  name="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="booking-time" style={labelStyle}>Preferred Time</label>
                <select
                  id="booking-time"
                  name="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="" disabled>Select time</option>
                  <option value="7:00 AM">7:00 AM — Breakfast</option>
                  <option value="8:00 AM">8:00 AM — Breakfast</option>
                  <option value="10:00 AM">10:00 AM — Brunch</option>
                  <option value="12:00 PM">12:00 PM — Lunch</option>
                  <option value="1:00 PM">1:00 PM — Lunch</option>
                  <option value="6:00 PM">6:00 PM — Dinner</option>
                  <option value="7:00 PM">7:00 PM — Dinner</option>
                  <option value="8:00 PM">8:00 PM — Dinner</option>
                  <option value="9:00 PM">9:00 PM — Late Dinner</option>
                </select>
              </div>

              {/* Table No */}
              <div>
                <label htmlFor="booking-table" style={labelStyle}>Table No. (optional)</label>
                <input
                  id="booking-table"
                  name="tableNo"
                  type="text"
                  placeholder="e.g. T-5 or leave blank"
                  value={form.tableNo}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* Special note */}
              <div>
                <label htmlFor="booking-message" style={labelStyle}>Special Note (optional)</label>
                <input
                  id="booking-message"
                  name="message"
                  type="text"
                  placeholder="Birthday, allergy info, occasion…"
                  value={form.message}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Submit */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                type="submit"
                id="booking-submit"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "1rem 2.5rem",
                  background: "linear-gradient(135deg,#25d366,#128c4e)",
                  color: "white",
                  border: "none",
                  borderRadius: "100px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  fontFamily: "'Lato',sans-serif",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  boxShadow: "0 6px 24px rgba(37,211,102,0.4)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(37,211,102,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(37,211,102,0.4)";
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.557 4.12 1.524 5.856L0 24l6.32-1.524A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.813 9.813 0 0 1-5.006-1.373l-.358-.214-3.752.984.999-3.648-.233-.376A9.82 9.82 0 0 1 2.182 12C2.182 6.566 6.566 2.182 12 2.182S21.818 6.566 21.818 12 17.434 21.818 12 21.818z" />
                </svg>
                Send Booking via WhatsApp
              </button>

              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "0.82rem",
                  color: "var(--text-light)",
                  fontFamily: "'Lato',sans-serif",
                }}
              >
                You&apos;ll be redirected to WhatsApp. We confirm within 30 minutes.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
