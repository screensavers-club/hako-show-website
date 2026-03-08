"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import NavButton from "./NavButton";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
}) as React.ComponentType<{
  stampMode?: boolean;
}>;

const ARTISTS = [
  "Chong Wah",
  "Yanrong",
  "Gravy Baby",
  "Unoverlyseasoned",
  "Kelly Jin Mei",
];

export default function SceneLoader() {
  const [stampMode, setStampMode] = useState(false);
  const [showArtists, setShowArtists] = useState(false);

  return (
    <>
      {stampMode && (
        <div
          className="pointer-events-none fixed inset-0 z-50"
          style={{ border: "20px solid #FDF644" }}
        />
      )}
      <button
        onClick={() => setStampMode((s) => !s)}
        className="fixed top-2 right-2 z-50 flex h-12 w-12 cursor-pointer items-center justify-center transition-colors"
        style={{
          background: stampMode ? "var(--bright-yellow)" : "rgba(0,0,0,0.15)",
        }}
        title={stampMode ? "Stamp mode ON" : "Stamp mode OFF"}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Handle */}
          <rect
            x="10"
            y="2"
            width="8"
            height="10"
            rx="2"
            fill={stampMode ? "#222" : "#666"}
          />
          {/* Base */}
          <rect
            x="6"
            y="14"
            width="16"
            height="4"
            rx="1"
            fill={stampMode ? "#222" : "#666"}
          />
          {/* Pad */}
          <rect
            x="4"
            y="19"
            width="20"
            height="5"
            rx="1.5"
            fill={stampMode ? "#D32F2F" : "#999"}
          />
        </svg>
      </button>
      <div className="fixed top-2 left-2 z-50">
        <NavButton
          active={showArtists}
          onClick={() => setShowArtists((s) => !s)}
        >
          Artists
        </NavButton>

        <NavButton href="/dining-rsvp" className="">
          Dining Experience
        </NavButton>
        {showArtists && (
          <div
            className="mt-2 overflow-hidden rounded-lg border-2 py-1"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              borderColor: "rgba(0,0,0,0.15)",
            }}
          >
            {ARTISTS.map((name) => (
              <div
                key={name}
                className="px-4 py-2 text-sm font-medium text-gray-800"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
      <Scene stampMode={stampMode} />
    </>
  );
}
