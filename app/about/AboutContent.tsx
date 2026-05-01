"use client";

import { useState } from "react";
import { sections, type Section } from "./data";

type Lang = "en" | "ja";

function renderParagraph(text: string, key: string) {
  const parts = text.split(/(\*[^*\n]+\*)/g);
  return (
    <p key={key} className="mb-4 last:mb-0">
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function renderBody(text: string, keyPrefix: string) {
  return text
    .split(/\n\n+/)
    .map((para, i) => renderParagraph(para, `${keyPrefix}-${i}`));
}

function SectionBlock({
  section,
  lang,
}: {
  section: Section;
  lang: Lang;
}) {
  const enVisibility = lang === "en" ? "block" : "hidden md:block";
  const jaVisibility = lang === "ja" ? "block" : "hidden md:block";

  return (
    <article className="border-t border-gray-300 pt-8 md:pt-12">
      <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
        {String(section.id).padStart(2, "0")}
      </div>
      {section.author && (
        <div className="text-sm italic text-gray-600 mb-6">
          {section.author}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div lang="en" className={`leading-relaxed ${enVisibility}`}>
          <h2
            className="text-2xl md:text-3xl mb-3"
            style={{ fontFamily: "var(--font-hina-mincho), serif" }}
          >
            {section.title_en}
          </h2>
          <div className="text-base">
            {renderBody(section.english, `${section.id}-en`)}
          </div>
        </div>
        <div lang="ja" className={`leading-relaxed ${jaVisibility}`}>
          <h2
            className="text-2xl md:text-3xl mb-3"
            style={{ fontFamily: "var(--font-hina-mincho), serif" }}
          >
            {section.title_ja}
          </h2>
          <div className="text-base">
            {renderBody(section.japanese, `${section.id}-ja`)}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AboutContent() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div className="fixed inset-0 w-screen overflow-y-auto bg-[#f7f7f7] text-[var(--near-black)]">
      <div className="md:hidden sticky top-0 z-10 bg-[#f7f7f7]/95 backdrop-blur border-b border-gray-300">
        <div className="mx-auto max-w-3xl flex justify-center gap-1 px-4 py-3">
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={`px-4 py-1.5 text-sm tracking-wider transition-colors cursor-pointer ${
              lang === "en"
                ? "bg-[var(--near-black)] text-white"
                : "bg-transparent text-gray-600 hover:text-black"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("ja")}
            aria-pressed={lang === "ja"}
            className={`px-4 py-1.5 text-sm tracking-wider transition-colors cursor-pointer ${
              lang === "ja"
                ? "bg-[var(--near-black)] text-white"
                : "bg-transparent text-gray-600 hover:text-black"
            }`}
          >
            日本語
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-10 py-10 md:py-16">
        <header className="mb-10 md:mb-16 text-center">
          <h1
            className="text-4xl md:text-6xl"
            style={{ fontFamily: "var(--font-hina-mincho), serif" }}
          >
            HAKO（はこ）
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            24 March – 19 April 2026 · Kotomath Hyogomachi, Takamatsu
          </p>
        </header>

        <div className="space-y-10 md:space-y-16">
          {sections.map((section) => (
            <SectionBlock key={section.id} section={section} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}
