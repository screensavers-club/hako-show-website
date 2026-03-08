"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import NavButton from "./NavButton";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
}) as React.ComponentType<{
  stampMode?: boolean;
}>;

// [background, text] pairs using CSS variables
const ARTIST_COLORS: [string, string][] = [
  ["var(--cobalt-blue)", "white"],
  ["var(--bright-yellow)", "black"],
  ["var(--stamp-red)", "white"],
  ["var(--dark-ochre)", "white"],
  ["var(--soft-pink)", "black"],
  ["var(--leaf-green)", "white"],
];

const ARTISTS: { name: string; bio: string }[] = [
  {
    name: "Chong Wah",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Gravy Baby",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
  {
    name: "Kelly Jin Mei",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit.",
  },
  {
    name: "Siah",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    name: "Unoverlyseasoned",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
  },
  {
    name: "Yanrong",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea voluptate.",
  },
];

function DraggablePopup({
  artist,
  colorIdx,
  onClose,
  offsetIndex,
}: {
  artist: { name: string; bio: string };
  colorIdx: number;
  onClose: () => void;
  offsetIndex: number;
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({
    x: 120 + offsetIndex * 30,
    y: 80 + offsetIndex * 30,
  });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      dragOffset.current = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pos],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    setPos({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const [bg, fg] = ARTIST_COLORS[colorIdx % ARTIST_COLORS.length];

  return (
    <div
      ref={popupRef}
      className="fixed z-[60] w-64 shadow-lg"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Title bar - draggable */}
      <div
        className="flex cursor-grab items-center justify-between px-2 py-1 select-none active:cursor-grabbing"
        style={{ backgroundColor: bg, color: fg }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span className="text-sm font-medium">{artist.name}</span>
        <button
          className="ml-2 cursor-pointer text-sm leading-none"
          style={{ color: fg }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      {/* Body */}
      <div className="border-x-2 border-b-2 border-black bg-white p-3 text-sm text-gray-800">
        {artist.bio}
      </div>
    </div>
  );
}

export default function SceneLoader() {
  const [stampMode, setStampMode] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [openArtists, setOpenArtists] = useState<Set<number>>(new Set());
  const popupCounter = useRef(0);

  return (
    <>
      {stampMode && (
        <div
          className="pointer-events-none fixed inset-0 z-50"
          style={{ border: "20px solid var(--bright-yellow)" }}
        />
      )}
      <button
        onClick={() => setStampMode((s) => !s)}
        className={`fixed ${stampMode ? "top-1 right-1 py-3 px-6" : "top-4 right-4 p-0"} z-50 flex cursor-pointer items-center justify-center transition-all px-2 text-base sm:text-xl`}
        style={{
          color: stampMode ? "rgba(0,0,0,1)" : "black",
          background: stampMode ? "var(--bright-yellow)" : "white",
          boxShadow: stampMode ? "" : "3px 3px 0 rgba(0,0,0,1)",
        }}
        title={stampMode ? "Stamp mode ON" : "Stamp mode OFF"}
      >
        スタンプ
      </button>
      <div
        className={`fixed z-50 ${stampMode ? "top-8 left-8" : "top-4 left-4"} transition-all flex gap-8 hidden`}
      >
        <div className="relative">
          <NavButton
            active={showArtists}
            onClick={() => setShowArtists((s) => !s)}
          >
            アーティスト
          </NavButton>

          {showArtists && (
            <div className="absolute top-full left-0 mt-2 flex flex-col gap-2 items-start">
              {ARTISTS.map((artist, i) => (
                <span
                  key={artist.name}
                  className="cursor-pointer text-base sm:text-xl leading-relaxed px-1"
                  style={{
                    backgroundColor: ARTIST_COLORS[i % ARTIST_COLORS.length][0],
                    color: ARTIST_COLORS[i % ARTIST_COLORS.length][1],
                    boxShadow: "3px 3px 0 black",
                  }}
                  onClick={() => {
                    setOpenArtists((prev) => {
                      const next = new Set(prev);
                      next.add(i);
                      return next;
                    });
                    popupCounter.current++;
                  }}
                >
                  {artist.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <NavButton active={false} onClick={() => {}}>
          「はこ」とは？
        </NavButton>
      </div>
      <div
        className={`fixed z-50 text-base sm:text-xl text-gray-700 transition-all ${stampMode ? "bottom-8 left-8" : "bottom-4 left-4"} leading-relaxed`}
      >
        <p>
          <span className="bg-[var(--dark-ochre)] text-white">
            3/24(火)〜4/19(日)
          </span>
        </p>
        <p>
          <span className="bg-[var(--cobalt-blue)] text-white">
            11:00〜19:00
          </span>
          　<span className="bg-[var(--stamp-red)] text-white">定休日:月</span>
        </p>
        <p>
          <span className="bg-[var(--bright-yellow)] text-black">
            展示会:無料
          </span>
        </p>
        <p>&nbsp;</p>
        <p>
          <span className="bg-[var(--cobalt-blue)] text-white">
            プライベートダイニング
          </span>
        </p>
        <p>
          <span className="bg-[var(--bright-yellow)] text-black">有料</span>　
          <span className="bg-[var(--dark-ochre)] text-white">席数限定</span>　
          <a
            className="bg-[var(--soft-pink)] text-black pr-1"
            style={{
              boxShadow: "3px 3px 0 rgba(0,0,0,1)",
            }}
            href="/dining-rsvp"
          >
            WEB予約受付中 ↗
          </a>
        </p>
      </div>
      {Array.from(openArtists).map((i) => (
        <DraggablePopup
          key={ARTISTS[i].name}
          artist={ARTISTS[i]}
          colorIdx={i}
          offsetIndex={i}
          onClose={() => {
            setOpenArtists((prev) => {
              const next = new Set(prev);
              next.delete(i);
              return next;
            });
          }}
        />
      ))}
      <Scene stampMode={stampMode} />
    </>
  );
}
