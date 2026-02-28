import { NextResponse } from "next/server";

const VALID_DATES = ["March 28", "March 29", "March 30"];
const VALID_TIMES = ["18:00", "19:30"];

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, partySize, date, time, drinkPairing, afterDinnerDrink } = body;

  // Validate required fields
  if (!name || !email || !phone || !partySize || !date || !time) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const VALID_DRINK_PAIRINGS = ["herby-baby", "bitter-sour", "fresh-paloma", ""];
  if (drinkPairing && !VALID_DRINK_PAIRINGS.includes(drinkPairing)) {
    return NextResponse.json(
      { error: "Invalid drink pairing selection" },
      { status: 400 }
    );
  }

  const VALID_AFTER_DINNER_DRINKS = ["orange-brew", "dark-roast", ""];
  if (afterDinnerDrink && !VALID_AFTER_DINNER_DRINKS.includes(afterDinnerDrink)) {
    return NextResponse.json(
      { error: "Invalid after dinner drink selection" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  if (!/^[0-9+\-() ]{7,}$/.test(phone)) {
    return NextResponse.json(
      { error: "Invalid phone number" },
      { status: 400 }
    );
  }

  const size = Number(partySize);
  if (!Number.isInteger(size) || size < 1 || size > 8) {
    return NextResponse.json(
      { error: "Party size must be between 1 and 8" },
      { status: 400 }
    );
  }

  if (!VALID_DATES.includes(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  if (!VALID_TIMES.includes(time)) {
    return NextResponse.json({ error: "Invalid time" }, { status: 400 });
  }

  console.log("New reservation:", { name, email, phone, partySize: size, date, time, drinkPairing, afterDinnerDrink });

  return NextResponse.json({ success: true });
}
