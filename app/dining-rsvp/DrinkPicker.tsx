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
      <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
        {items.map((item, i) => (
          <div
            key={i}
            className="menu-dish transition-opacity duration-300"
            style={{
              opacity: i === active ? 1 : 0,
              visibility: i === active ? "visible" : "hidden",
              gridArea: "1 / 1",
            }}
          >
            <h3 className="menu-title">
              {item.title}
              {item.badge && (
                <span className="ml-2 inline-block align-middle text-[10px] font-medium px-1.5 py-0.5 border border-current opacity-60">
                  {item.badge}
                </span>
              )}
            </h3>
            <p className="menu-description">{item.description}</p>
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              type="button"
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
