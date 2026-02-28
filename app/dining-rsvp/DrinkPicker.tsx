"use client";

import { useState } from "react";

interface Item {
  title: string;
  description: string;
  badge?: string;
}

export default function DrinkPicker({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="menu-dish">
        <h3 className="menu-title">
          {items[active].title}
          {items[active].badge && (
            <span className="ml-2 inline-block align-middle text-[10px] font-medium px-1.5 py-0.5 border border-current opacity-60">
              {items[active].badge}
            </span>
          )}
        </h3>
        <p className="menu-description">{items[active].description}</p>
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-7 h-7 rounded-full text-xs transition-colors ${
                i === active
                  ? "bg-black text-white"
                  : "bg-transparent text-black border border-current"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
