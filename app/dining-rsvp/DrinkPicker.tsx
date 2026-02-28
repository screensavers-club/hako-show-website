"use client";

import { useState } from "react";

interface Item {
  title: string;
  description: string;
}

export default function DrinkPicker({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="menu-dish">
        <h3 className="menu-title">{items[active].title}</h3>
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
