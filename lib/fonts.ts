import { Geist, Instrument_Sans } from "next/font/google";

export const display = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

export const ui = Geist({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});
