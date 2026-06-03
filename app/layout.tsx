import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Green Yard Restaurant & Bar | Open Garden & Rooftop Dining in Kathmandu",
  description:
    "Discover Green Yard — Kathmandu's peaceful open garden and rooftop restaurant and bar. Enjoy lush greenery, healthy breakfast, coffee, live-coal sekuwa, Newari favourites, Italian bites, and national and international multi-cuisine.",
  keywords: [
    "Green Yard Restaurant",
    "garden restaurant Kathmandu",
    "outdoor dining Nepal",
    "birthday party venue Kathmandu",
    "Teej celebration restaurant",
    "engagement venue Nepal",
    "anniversary dinner Kathmandu",
    "nature restaurant KTM",
    "rooftop restaurant Kathmandu",
    "multi cuisine restaurant Kathmandu",
    "healthy breakfast Kathmandu",
    "sekuwa restaurant Bhaktapur",
    "Newari food Kathmandu",
  ],
  openGraph: {
    title: "Green Yard Restaurant & Bar",
    description:
      "Where Nature Meets Flavour — open garden and rooftop dining, multi-cuisine food and celebrations under the open sky.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
