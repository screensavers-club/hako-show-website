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

const ARTISTS: { name: string; bio: string; image: string }[] = [
  {
    name: "チョン•ワー",
    bio: "グラフィティカルチャーを出発点に、アーティスト／デザイナーとして活動する。リズムとフォルムを手がかりに、身体の動きと直感で視覚表現を立ち上げていく。スポーツ、スピード、サブカルチャー。その時々の関心に応じて作品も姿を変える。技法と個人的な興味が交わるところに、荒削りでありながら力強い、紛れもなく本人の表現が生まれている。",
    image: "/profile_chong.jpg",
  },

  {
    name: "ウー・イェンロン",
    bio: "最小限の筆致によって、モチーフの本質を捉える作品を手がける。中国書道とグラフィックデザインで培った感性を土台に、伝統と現代の要素を融合させた独自の画風を築き上げてきた。キャンバスの大きさに合わせ、筆から箒まで多彩な道具を自在に操りながら、空間・形態・質感を追求。緻密さと大胆さが共存する、独自の表現を切り拓いている。",
    image: "/profile_yr.jpg",
  },

  {
    name: "ケリー",
    bio: "主にテキスタイルを用いて制作を行う。アイデンティティ、所有、二元性といったテーマを探求し、その作品の多くは膨大な時間を費やした手仕事によって生み出される。完成した作品を自らの手で破壊するという行為を通じて、失われたものへの後悔や渇望の感情を呼び起こそうとしている。",
    image: "/profile_kelly.jpg",
  },
  {
    name: "シア",
    bio: "ウェブテクノロジーを、本来の文脈から外れた方法で用いる。テクノロジーは効率や合理性の道具と見なされがちだが、自らの手で作ることを通じて、別の角度からその本質を捉えようとしている。既存の技術を解体し、組み直すなかで、「うまく作れない」過程そのものを学びの手段として重視している。",
    image: "/profile_siah.jpg",
  },
  {
    name: "グレイビー•ベイビー (カルメン•チェン)",
    bio: "文化と実験から生まれる料理実践である。プラナカンの伝統を大切にしつつも新しい手法を取り入れ、料理を通じて、食事だけでなく会話やつながりを楽しめる場をつくる。その集まりは、ただ食べるためではなく、共に参加するための招待でもある。",
    image: "/profile_gb.jpg",
  },
  {
    name: "ケン",
    bio: "視覚、言葉、味覚を横断しながら活動する。五感を通じた探求を続け、心を惹く味わいを追い求めている。京都発のカフェ「Kurasu Singapore」では、コーヒーやV60ハンドドリップを手がける。カクテルの実験にも取り組み、ナチュラルワインを好む。これまでにコピーライティング、ブランディング、デザインの分野でも経験を積んできた。",
    image: "/profile_ken.jpg",
  },
];

function DraggablePopup({
  artist,
  colorIdx,
  onClose,
  offsetIndex,
  zIndex,
  onFocus,
}: {
  artist: { name: string; bio: string };
  colorIdx: number;
  onClose: () => void;
  offsetIndex: number;
  zIndex: number;
  onFocus: () => void;
}) {
  const popupRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({
    x: 60 + offsetIndex * 15,
    y: 80 + offsetIndex * 45,
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
      className="fixed w-64 overflow-hidden border-2 border-black shadow-lg"
      style={{ left: pos.x, top: pos.y, zIndex: zIndex }}
      onPointerDown={onFocus}
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
      <div className="bg-white p-3 text-sm text-gray-800">{artist.bio}</div>
    </div>
  );
}

function DraggableImagePopup({
  name,
  image,
  colorIdx,
  offsetIndex,
  zIndex,
  onFocus,
  onClose,
}: {
  name: string;
  image: string;
  colorIdx: number;
  offsetIndex: number;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
}) {
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState(() => {
    const mobile = typeof window !== "undefined" && window.innerWidth < 640;
    return mobile
      ? { x: 60 + offsetIndex * 15, y: 80 + 320 + 12 + offsetIndex * 45 }
      : { x: 60 + 256 + 12 + offsetIndex * 15, y: 45 + offsetIndex * 15 };
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
      className="fixed w-48 overflow-hidden border-2 border-black shadow-lg"
      style={{ left: pos.x, top: pos.y, zIndex }}
      onPointerDown={onFocus}
    >
      <div
        className="flex cursor-grab items-center justify-between px-2 py-1 select-none active:cursor-grabbing"
        style={{ backgroundColor: bg, color: fg }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span className="text-sm font-medium">PROFILE</span>
        <button
          className="ml-2 cursor-pointer text-sm leading-none"
          style={{ color: fg }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div className="bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} className="block w-full" />
      </div>
    </div>
  );
}

export default function SceneLoader() {
  const [stampMode, setStampMode] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [openArtists, setOpenArtists] = useState<Set<number>>(new Set());
  const [openImages, setOpenImages] = useState<Set<number>>(new Set());
  const popupCounter = useRef(0);
  const zCounter = useRef(60);
  const [zIndices, setZIndices] = useState<Record<string, number>>({});

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
        className={`fixed z-50 ${stampMode ? "top-8 left-8" : "top-4 left-4"} transition-all flex gap-8 `}
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
                    setOpenImages((prev) => {
                      const next = new Set(prev);
                      next.add(i);
                      return next;
                    });
                    popupCounter.current++;
                    zCounter.current += 2;
                    setZIndices((prev) => ({
                      ...prev,
                      [`bio-${i}`]: zCounter.current - 1,
                      [`img-${i}`]: zCounter.current,
                    }));
                  }}
                >
                  {artist.name.charAt(0)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/*
        <NavButton active={false} onClick={() => {}}>
          「はこ」とは？
        </NavButton>
        */}
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
          zIndex={zIndices[`bio-${i}`] ?? 60}
          onFocus={() => {
            zCounter.current++;
            setZIndices((prev) => ({
              ...prev,
              [`bio-${i}`]: zCounter.current,
            }));
          }}
          onClose={() => {
            setOpenArtists((prev) => {
              const next = new Set(prev);
              next.delete(i);
              return next;
            });
          }}
        />
      ))}
      {Array.from(openImages).map((i) => (
        <DraggableImagePopup
          key={`img-${ARTISTS[i].name}`}
          name={ARTISTS[i].name}
          image={ARTISTS[i].image}
          colorIdx={i}
          offsetIndex={i}
          zIndex={zIndices[`img-${i}`] ?? 60}
          onFocus={() => {
            zCounter.current++;
            setZIndices((prev) => ({
              ...prev,
              [`img-${i}`]: zCounter.current,
            }));
          }}
          onClose={() => {
            setOpenImages((prev) => {
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
