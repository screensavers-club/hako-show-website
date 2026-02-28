"use client";

import { useState } from "react";
import MenuPopover from "./MenuPopover";

const DATES = ["March 27", "March 28", "March 29"];
const TIMES = ["18:00", "19:30"];
const DRINK_PAIRINGS = [
  {
    id: "",
    name: "後で決める",
    description: "当日にご注文いただけます",
    badge: "",
  },
  {
    id: "herby-baby",
    name: "Herby Baby",
    description: "レモングラス、生姜、ソーダ",
    badge: "ノンアル",
  },
  {
    id: "bitter-sour",
    name: "Bitter Sour",
    description: "ゴーヤ、酸梅、氷砂糖、ジン、エッグホワイトフォーム",
    badge: "アルコル",
  },
  {
    id: "fresh-paloma",
    name: "Fresh Paloma",
    description: "純米大吟醸酒、みかん、ソーダ、アガベシロップ、ライム",
    badge: "アルコル",
  },
];

const AFTER_DINNER_DRINKS = [
  {
    id: "",
    name: "後で決める",
    description: "当日にご注文いただけます",
    badge: "",
  },
  {
    id: "orange-brew",
    name: "Orange Brew",
    description:
      "ダックシット・ウーロンコールドブリュー、タンジェリンの皮エキス",
    badge: "ノンアル",
  },
  {
    id: "dark-roast",
    name: "Dark Roast Coffee",
    description: "深煎りコーヒー",
    badge: "ノンアル",
  },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [date, setDate] = useState(DATES[0]);
  const [time, setTime] = useState(TIMES[0]);
  const [drinkPairing, setDrinkPairing] = useState("");
  const [afterDinnerDrink, setAfterDinnerDrink] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/dining-rsvp/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          partySize,
          date,
          time,
          drinkPairing,
          afterDinnerDrink,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "エラーが発生しました");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "エラーが発生しました");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full max-w-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">ご予約ありがとうございます</h2>
        <p className="text-gray-600 mb-6">
          {date} {time} にお待ちしております。確認メールを {email}{" "}
          にお送りしました。
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setName("");
            setEmail("");
            setPhone("");
            setPartySize(1);
            setDate(DATES[0]);
            setTime(TIMES[0]);
            setDrinkPairing("");
            setAfterDinnerDrink("");
          }}
          className="text-sm text-[#3d4f5f] hover:underline cursor-pointer"
        >
          別の予約をする
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">ディナー予約</h1>
      <p className="text-base text-center mb-6">
        HAKO展の一環として、シンガポールが誇るペラナカン料理の世界をご紹介いたします。Gravy
        Babyによるペラナカンの伝統とKenのドリンクペアリング、期間限定のコースメニュー。
      </p>
      <div className="text-center mb-6">
        <MenuPopover />
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            お名前
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f5f]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f5f]"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            電話番号
          </label>
          <input
            id="phone"
            type="tel"
            required
            pattern="[0-9+\-() ]{7,}"
            title="有効な電話番号を入力してください"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f5f]"
          />
        </div>

        <div>
          <label htmlFor="partySize" className="block text-sm font-medium mb-1">
            人数
          </label>
          <select
            id="partySize"
            required
            value={partySize}
            onChange={(e) => setPartySize(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f5f]"
          >
            {Array.from({ length: 4 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}名
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">
              日付
            </label>
            <select
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f5f]"
            >
              {DATES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              時間
            </label>
            <select
              id="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d4f5f]"
            >
              {TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            食事のドリンク
          </label>
          <div className="grid grid-cols-1 gap-2">
            {DRINK_PAIRINGS.map((drink) => (
              <button
                key={drink.id}
                type="button"
                onClick={() => setDrinkPairing(drink.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  drinkPairing === drink.id
                    ? "border-[#3d4f5f] bg-[#3d4f5f]/5 ring-2 ring-[#3d4f5f] ring-offset-1"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{drink.name}</span>
                  {drink.badge && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        drink.badge === "アルコル"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {drink.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {drink.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">食後の一杯</label>
          <div className="grid grid-cols-1 gap-2">
            {AFTER_DINNER_DRINKS.map((drink) => (
              <button
                key={drink.id}
                type="button"
                onClick={() => setAfterDinnerDrink(drink.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  afterDinnerDrink === drink.id
                    ? "border-[#3d4f5f] bg-[#3d4f5f]/5 ring-2 ring-[#3d4f5f] ring-offset-1"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{drink.name}</span>
                  {drink.badge && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        drink.badge === "アルコル"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {drink.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {drink.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" required className="mt-0.5 accent-[#3d4f5f]" />
        <span>メニューに記載のアレルゲン情報を確認し、了承しました。</span>
      </label>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-lg bg-[#3d4f5f] py-2.5 text-sm font-semibold text-white shadow hover:bg-[#2e3d4d] disabled:opacity-50 cursor-pointer transition-colors"
      >
        {status === "submitting" ? "予約中..." : "予約する"}
      </button>
    </form>
  );
}
