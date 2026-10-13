import { Schibsted_Grotesk, Syne } from "next/font/google";

export const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const wordmark = Syne({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-wordmark",
  display: "swap",
});
