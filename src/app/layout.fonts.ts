import { Poppins } from "next/font/google";

// next/font only accepts literal options, so the font is configured here instead of in layout.tsx
export const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
