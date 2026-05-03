import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — HAKOはこ",
  description:
    "Curatorial texts for HAKO, a group exhibition by 6 Singaporean creatives at Kotomath Hyogomachi, Takamatsu, 24 March – 19 April 2026.",
};

export default function AboutPage() {
  return <AboutContent />;
}
