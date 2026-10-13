import { Fraunces, IBM_Plex_Sans } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-fraunces",
  display: "swap",
});

export const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex",
  display: "swap",
});
