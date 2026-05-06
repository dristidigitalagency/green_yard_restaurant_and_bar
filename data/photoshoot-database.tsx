// ============================================================
//  Green Yard Restaurant & Bar — Customer Photo-Shoot Database
//  Each session groups images shot on the same date / occasion.
//  IMG numbers are used to infer approximate chronological order.
// ============================================================

export interface PhotoShootImage {
  src: string;
  alt: string;
}

export interface PhotoShootSession {
  id: string;
  date: string;           // ISO date  e.g. "2025-03-15"
  displayDate: string;    // Human label e.g. "March 15, 2025"
  occasion: string;       // Short occasion label
  description: string;
  images: PhotoShootImage[];
  coverImage: string;     // Path used as the hero for the session card
}

export const photoShootSessions: PhotoShootSession[] = [
  // ── Session 1 ────────────────────────────────────────────
  {
    id: "session-2024-teej",
    date: "2024-09-06",
    displayDate: "September 6, 2024",
    occasion: "Teej Celebration",
    description:
      "A vibrant Teej celebration at Green Yard — women in stunning red sarees dancing, dining, and creating lifelong memories in our lush garden.",
    coverImage: "/images/customer-photo-shoot/IMG_0014.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_0014.jpg.jpeg", alt: "Teej celebration group photo" },
      { src: "/images/customer-photo-shoot/IMG_0020.jpg.jpeg", alt: "Teej dance performance" },
      { src: "/images/customer-photo-shoot/IMG_0026.jpg.jpeg", alt: "Ladies in red sarees" },
      { src: "/images/customer-photo-shoot/IMG_0030.jpg.jpeg", alt: "Teej ritual moment" },
      { src: "/images/customer-photo-shoot/IMG_0032.jpg.jpeg", alt: "Group celebrating Teej" },
      { src: "/images/customer-photo-shoot/IMG_0034.jpg.jpeg", alt: "Teej festivity" },
      { src: "/images/customer-photo-shoot/IMG_0036.jpg.jpeg", alt: "Teej dance group" },
      { src: "/images/customer-photo-shoot/IMG_0042.jpg.jpeg", alt: "Ladies posing in garden" },
      { src: "/images/customer-photo-shoot/IMG_0052.jpg.jpeg", alt: "Teej dining" },
      { src: "/images/customer-photo-shoot/IMG_0054.jpg.jpeg", alt: "Teej celebration wide" },
      { src: "/images/customer-photo-shoot/IMG_0062.jpg.jpeg", alt: "Teej group photo" },
      { src: "/images/customer-photo-shoot/IMG_0063.jpg.jpeg", alt: "Teej outdoor celebration" },
      { src: "/images/customer-photo-shoot/IMG_0064.jpg.jpeg", alt: "Teej fun moments" },
      { src: "/images/customer-photo-shoot/IMG_0069.jpg.jpeg", alt: "Teej portrait" },
    ],
  },

  // ── Session 2 ────────────────────────────────────────────
  {
    id: "session-2024-oct-gathering",
    date: "2024-10-12",
    displayDate: "October 12, 2024",
    occasion: "Private Gathering",
    description:
      "An intimate private gathering where guests enjoyed our garden ambiance, delicious meals, and the warm company of loved ones.",
    coverImage: "/images/customer-photo-shoot/IMG_0197.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_0197.jpg.jpeg", alt: "Private gathering group" },
      { src: "/images/customer-photo-shoot/IMG_0199 (2).jpg.jpeg", alt: "Guests dining together" },
      { src: "/images/customer-photo-shoot/IMG_0201.jpg.jpeg", alt: "Garden gathering" },
      { src: "/images/customer-photo-shoot/IMG_0202.jpg.jpeg", alt: "Family group photo" },
      { src: "/images/customer-photo-shoot/IMG_0203.jpg.jpeg", alt: "Friends at Green Yard" },
      { src: "/images/customer-photo-shoot/IMG_0204.jpg.jpeg", alt: "Casual dining" },
      { src: "/images/customer-photo-shoot/IMG_0205.jpg.jpeg", alt: "Outdoor gathering" },
      { src: "/images/customer-photo-shoot/IMG_0207.jpg.jpeg", alt: "Group smiling" },
    ],
  },

  // ── Session 3 ────────────────────────────────────────────
  {
    id: "session-2024-nov-birthday",
    date: "2024-11-08",
    displayDate: "November 8, 2024",
    occasion: "Birthday Celebration",
    description:
      "A spectacular birthday bash — cake, laughter, balloon décor and joyful memories under the stars at Green Yard.",
    coverImage: "/images/customer-photo-shoot/IMG_0218.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_0218.jpg.jpeg", alt: "Birthday celebration" },
      { src: "/images/customer-photo-shoot/IMG_0219.jpg.jpeg", alt: "Birthday party" },
      { src: "/images/customer-photo-shoot/IMG_0221.jpg.jpeg", alt: "Cake cutting" },
      { src: "/images/customer-photo-shoot/IMG_0222.jpg.jpeg", alt: "Birthday group" },
      { src: "/images/customer-photo-shoot/IMG_0223.jpg.jpeg", alt: "Birthday fun" },
      { src: "/images/customer-photo-shoot/IMG_0224.jpg.jpeg", alt: "Celebration moments" },
      { src: "/images/customer-photo-shoot/IMG_0226.jpg.jpeg", alt: "Birthday candid" },
      { src: "/images/customer-photo-shoot/IMG_0229.jpg.jpeg", alt: "Birthday portrait" },
      { src: "/images/customer-photo-shoot/IMG_0236.jpg.jpeg", alt: "Party atmosphere" },
      { src: "/images/customer-photo-shoot/IMG_0237.jpg.jpeg", alt: "Birthday smiles" },
      { src: "/images/customer-photo-shoot/IMG_0238.jpg.jpeg", alt: "Birthday gathering" },
      { src: "/images/customer-photo-shoot/IMG_0241.jpg.jpeg", alt: "Celebration wide shot" },
    ],
  },

  // ── Session 4 ────────────────────────────────────────────
  {
    id: "session-2024-dec-anniversary",
    date: "2024-12-20",
    displayDate: "December 20, 2024",
    occasion: "Anniversary Dinner",
    description:
      "A romantic anniversary evening — couples celebrating love surrounded by fairy lights, candles, and lush greenery.",
    coverImage: "/images/customer-photo-shoot/IMG_0242.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_0242.jpg.jpeg", alt: "Anniversary couple" },
      { src: "/images/customer-photo-shoot/IMG_0243.jpg.jpeg", alt: "Romantic evening" },
      { src: "/images/customer-photo-shoot/IMG_0244.jpg.jpeg", alt: "Candlelight anniversary" },
      { src: "/images/customer-photo-shoot/IMG_0246.jpg.jpeg", alt: "Anniversary celebration" },
      { src: "/images/customer-photo-shoot/IMG_0247.jpg.jpeg", alt: "Couple portrait" },
      { src: "/images/customer-photo-shoot/IMG_0248.jpg.jpeg", alt: "Anniversary dinner" },
      { src: "/images/customer-photo-shoot/IMG_0250.jpg.jpeg", alt: "Evening celebration" },
      { src: "/images/customer-photo-shoot/IMG_0251.jpg.jpeg", alt: "Anniversary smiles" },
      { src: "/images/customer-photo-shoot/IMG_0252.jpg.jpeg", alt: "Couple evening" },
      { src: "/images/customer-photo-shoot/IMG_0254.jpg.jpeg", alt: "Anniversary portrait" },
      { src: "/images/customer-photo-shoot/IMG_0256.jpg.jpeg", alt: "Romantic garden" },
      { src: "/images/customer-photo-shoot/IMG_0258.jpg.jpeg", alt: "Anniversary wide" },
      { src: "/images/customer-photo-shoot/IMG_0259.jpg.jpeg", alt: "Couple candid" },
      { src: "/images/customer-photo-shoot/IMG_0261.jpg.jpeg", alt: "Anniversary glow" },
      { src: "/images/customer-photo-shoot/IMG_0264.jpg.jpeg", alt: "Evening portrait" },
      { src: "/images/customer-photo-shoot/IMG_0266.jpg.jpeg", alt: "Anniversary table" },
      { src: "/images/customer-photo-shoot/IMG_0267.jpg.jpeg", alt: "Couple smiling" },
      { src: "/images/customer-photo-shoot/IMG_0269.jpg.jpeg", alt: "Anniversary fun" },
      { src: "/images/customer-photo-shoot/IMG_0271.jpg.jpeg", alt: "Garden anniversary" },
      { src: "/images/customer-photo-shoot/IMG_0272.jpg.jpeg", alt: "Anniversary evening" },
      { src: "/images/customer-photo-shoot/IMG_0275.jpg.jpeg", alt: "Celebration couple" },
      { src: "/images/customer-photo-shoot/IMG_0277.jpg.jpeg", alt: "Romantic moments" },
      { src: "/images/customer-photo-shoot/IMG_0278.jpg.jpeg", alt: "Anniversary night" },
      { src: "/images/customer-photo-shoot/IMG_0279.jpg.jpeg", alt: "End of evening" },
    ],
  },

  // ── Session 5 ────────────────────────────────────────────
  {
    id: "session-2025-jan-corporate",
    date: "2025-01-18",
    displayDate: "January 18, 2025",
    occasion: "Corporate Lunch",
    description:
      "A corporate team lunch in our serene garden — great food, fresh air, and the perfect environment to unwind and connect with colleagues.",
    coverImage: "/images/customer-photo-shoot/IMG_1283.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_1283.jpg.jpeg", alt: "Corporate team lunch" },
      { src: "/images/customer-photo-shoot/IMG_1284.jpg.jpeg", alt: "Office team gathering" },
      { src: "/images/customer-photo-shoot/IMG_1287.jpg.jpeg", alt: "Team dining" },
      { src: "/images/customer-photo-shoot/IMG_1291.jpg.jpeg", alt: "Corporate event" },
      { src: "/images/customer-photo-shoot/IMG_1313.jpg.jpeg", alt: "Team group photo" },
      { src: "/images/customer-photo-shoot/IMG_1315.jpg.jpeg", alt: "Colleagues at lunch" },
      { src: "/images/customer-photo-shoot/IMG_1317 (1).jpg.jpeg", alt: "Corporate outing" },
      { src: "/images/customer-photo-shoot/IMG_1317.jpg.jpeg", alt: "Team at garden" },
      { src: "/images/customer-photo-shoot/IMG_1318 (1).jpg.jpeg", alt: "Corporate gathering" },
      { src: "/images/customer-photo-shoot/IMG_1318.jpg.jpeg", alt: "Office party" },
    ],
  },

  // ── Session 6 ────────────────────────────────────────────
  {
    id: "session-2025-feb-engagement",
    date: "2025-02-14",
    displayDate: "February 14, 2025",
    occasion: "Engagement Party",
    description:
      "A heartwarming engagement celebration — floral arrangements, golden décor, and two hearts saying yes surrounded by family and friends.",
    coverImage: "/images/customer-photo-shoot/IMG_1334.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_1334.jpg.jpeg", alt: "Engagement celebration" },
      { src: "/images/customer-photo-shoot/IMG_1335.jpg.jpeg", alt: "Engaged couple" },
      { src: "/images/customer-photo-shoot/IMG_1336.jpg.jpeg", alt: "Engagement party" },
      { src: "/images/customer-photo-shoot/IMG_1339.jpg.jpeg", alt: "Family at engagement" },
      { src: "/images/customer-photo-shoot/IMG_1341.jpg.jpeg", alt: "Engagement décor" },
      { src: "/images/customer-photo-shoot/IMG_1342.jpg.jpeg", alt: "Couple portrait" },
      { src: "/images/customer-photo-shoot/IMG_1343.jpg.jpeg", alt: "Ring exchange" },
      { src: "/images/customer-photo-shoot/IMG_1345.jpg.jpeg", alt: "Guests celebrating" },
      { src: "/images/customer-photo-shoot/IMG_1347.jpg.jpeg", alt: "Engagement dinner" },
      { src: "/images/customer-photo-shoot/IMG_1349.jpg.jpeg", alt: "Floral setup" },
      { src: "/images/customer-photo-shoot/IMG_1350.jpg.jpeg", alt: "Engagement toast" },
      { src: "/images/customer-photo-shoot/IMG_1353.jpg.jpeg", alt: "Celebration moments" },
      { src: "/images/customer-photo-shoot/IMG_1354.jpg.jpeg", alt: "Couple laughing" },
      { src: "/images/customer-photo-shoot/IMG_1357.jpg.jpeg", alt: "Engagement wide" },
      { src: "/images/customer-photo-shoot/IMG_1358.jpg.jpeg", alt: "Engagement candid" },
      { src: "/images/customer-photo-shoot/IMG_1359.jpg.jpeg", alt: "Joy at Green Yard" },
      { src: "/images/customer-photo-shoot/IMG_1360.jpg.jpeg", alt: "Engagement group" },
    ],
  },

  // ── Session 7 ────────────────────────────────────────────
  {
    id: "session-2025-mar-baby-shower",
    date: "2025-03-22",
    displayDate: "March 22, 2025",
    occasion: "Baby Shower",
    description:
      "A magical baby shower surrounded by pastel balloons, tender moments, and the joy of welcoming a new life into the world.",
    coverImage: "/images/customer-photo-shoot/IMG_1368.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_1368.jpg.jpeg", alt: "Baby shower celebration" },
      { src: "/images/customer-photo-shoot/IMG_1369.jpg.jpeg", alt: "Baby shower décor" },
      { src: "/images/customer-photo-shoot/IMG_1381.jpg.jpeg", alt: "Mom-to-be portrait" },
      { src: "/images/customer-photo-shoot/IMG_1382.jpg.jpeg", alt: "Baby shower group" },
      { src: "/images/customer-photo-shoot/IMG_1386.jpg.jpeg", alt: "Balloon decorations" },
      { src: "/images/customer-photo-shoot/IMG_1387.jpg.jpeg", alt: "Shower celebration" },
      { src: "/images/customer-photo-shoot/IMG_1388.jpg.jpeg", alt: "Baby shower moment" },
      { src: "/images/customer-photo-shoot/IMG_1390.jpg.jpeg", alt: "Guests at baby shower" },
    ],
  },

  // ── Session 8 ────────────────────────────────────────────
  {
    id: "session-2025-apr-brunch",
    date: "2025-04-05",
    displayDate: "April 5, 2025",
    occasion: "Weekend Brunch",
    description:
      "A delightful weekend brunch gathering — friends, fresh food, and the stunning natural beauty of Green Yard's garden terrace.",
    coverImage: "/images/customer-photo-shoot/IMG_1483.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_1483.jpg.jpeg", alt: "Weekend brunch" },
      { src: "/images/customer-photo-shoot/IMG_1485.jpg.jpeg", alt: "Brunch at garden" },
      { src: "/images/customer-photo-shoot/IMG_1489.jpg.jpeg", alt: "Friends brunch" },
      { src: "/images/customer-photo-shoot/IMG_1490.jpg.jpeg", alt: "Brunch gathering" },
      { src: "/images/customer-photo-shoot/IMG_1493.jpg.jpeg", alt: "Garden brunch" },
      { src: "/images/customer-photo-shoot/IMG_1495.jpg.jpeg", alt: "Brunch group" },
      { src: "/images/customer-photo-shoot/IMG_1496.jpg.jpeg", alt: "Weekend vibes" },
      { src: "/images/customer-photo-shoot/IMG_1498.jpg.jpeg", alt: "Outdoor dining" },
      { src: "/images/customer-photo-shoot/IMG_1499.jpg.jpeg", alt: "Brunch fun" },
      { src: "/images/customer-photo-shoot/IMG_1500.jpg.jpeg", alt: "Morning gathering" },
      { src: "/images/customer-photo-shoot/IMG_1501.jpg.jpeg", alt: "Brunch candid" },
      { src: "/images/customer-photo-shoot/IMG_1503.jpg.jpeg", alt: "Garden morning" },
      { src: "/images/customer-photo-shoot/IMG_1507.jpg.jpeg", alt: "Weekend brunch moment" },
      { src: "/images/customer-photo-shoot/IMG_1509.jpg.jpeg", alt: "Brunch smiles" },
      { src: "/images/customer-photo-shoot/IMG_1510.jpg.jpeg", alt: "Brunch close-up" },
      { src: "/images/customer-photo-shoot/IMG_1516.jpg.jpeg", alt: "Brunch wide" },
      { src: "/images/customer-photo-shoot/IMG_1518.jpg.jpeg", alt: "Friends at Green Yard" },
      { src: "/images/customer-photo-shoot/IMG_1523.jpg.jpeg", alt: "Brunch portrait" },
      { src: "/images/customer-photo-shoot/IMG_1525.jpg.jpeg", alt: "Garden dining" },
      { src: "/images/customer-photo-shoot/IMG_1526.jpg.jpeg", alt: "Brunch group wide" },
      { src: "/images/customer-photo-shoot/IMG_1528.jpg.jpeg", alt: "Outdoor meal" },
      { src: "/images/customer-photo-shoot/IMG_1529.jpg.jpeg", alt: "Brunch finish" },
    ],
  },

  // ── Session 9 ────────────────────────────────────────────
  {
    id: "session-2025-apr-family-day",
    date: "2025-04-19",
    displayDate: "April 19, 2025",
    occasion: "Family Day Out",
    description:
      "A joyful family day at Green Yard — three generations sharing food, laughter, and beautiful moments in our garden.",
    coverImage: "/images/customer-photo-shoot/IMG_2036.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_2036.jpg.jpeg", alt: "Family day at Green Yard" },
      { src: "/images/customer-photo-shoot/IMG_2123.jpg.jpeg", alt: "Family gathering" },
    ],
  },

  // ── Session 10 ───────────────────────────────────────────
  {
    id: "session-2025-may-photo-session",
    date: "2025-05-03",
    displayDate: "May 3, 2025",
    occasion: "Professional Photo Shoot",
    description:
      "A recent professional photo session capturing the vibrant personality of our guests against the lush green backdrop of Green Yard.",
    coverImage: "/images/customer-photo-shoot/IMG_9505.jpg.jpeg",
    images: [
      { src: "/images/customer-photo-shoot/IMG_9505.jpg.jpeg", alt: "Photo session portrait" },
      { src: "/images/customer-photo-shoot/IMG_9506.jpg.jpeg", alt: "Professional shoot" },
      { src: "/images/customer-photo-shoot/IMG_9511.jpg.jpeg", alt: "Garden portrait" },
      { src: "/images/customer-photo-shoot/IMG_9540.jpg.jpeg", alt: "Photo session candid" },
      { src: "/images/customer-photo-shoot/IMG_9541.jpg.jpeg", alt: "Garden shoot" },
      { src: "/images/customer-photo-shoot/IMG_9543.jpg.jpeg", alt: "Portrait session" },
      { src: "/images/customer-photo-shoot/IMG_9553.jpg.jpeg", alt: "Green backdrop shoot" },
      { src: "/images/customer-photo-shoot/IMG_9562.jpg.jpeg", alt: "Natural portrait" },
      { src: "/images/customer-photo-shoot/IMG_9578.jpg.jpeg", alt: "Garden photo" },
      { src: "/images/customer-photo-shoot/IMG_9581.jpg.jpeg", alt: "Photo shoot moment" },
      { src: "/images/customer-photo-shoot/IMG_9599.jpg.jpeg", alt: "Portrait at Green Yard" },
      { src: "/images/customer-photo-shoot/IMG_9615.jpg.jpeg", alt: "Photo session close-up" },
      { src: "/images/customer-photo-shoot/IMG_9628.jpg.jpeg", alt: "Garden portrait final" },
      { src: "/images/customer-photo-shoot/IMG_9988 (1).jpg.jpeg", alt: "Photo shoot extra" },
      { src: "/images/customer-photo-shoot/IMG_9989.jpg.jpeg", alt: "Portrait candid" },
      { src: "/images/customer-photo-shoot/IMG_9990.jpg.jpeg", alt: "Garden session" },
      { src: "/images/customer-photo-shoot/IMG_9992 (1).jpg.jpeg", alt: "Natural light shoot" },
      { src: "/images/customer-photo-shoot/IMG_9994.jpg.jpeg", alt: "Photo shoot end" },
      { src: "/images/customer-photo-shoot/IMG_9998.jpg.jpeg", alt: "Final portrait" },
    ],
  },
];
