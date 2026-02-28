import { NextResponse } from "next/server";
import postmark from "postmark";

const VALID_DATES = ["March 27", "March 28", "March 29"];
const VALID_TIMES = ["18:00", "19:30"];

const DRINK_MAP: Record<string, string> = {
  "herby-baby": "Herby Baby",
  "bitter-sour": "Bitter Sour",
  "fresh-paloma": "Fresh Paloma",
  "orange-brew": "Orange Brew",
  "dark-roast": "Dark Roast Coffee",
};

async function sendNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  time: string;
  drinkPairing: string;
  afterDinnerDrink: string;
}) {
  const POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

  if (!POSTMARK_SERVER_TOKEN || !NOTIFICATION_EMAIL) {
    console.error("Missing Postmark config");
    return;
  }

  const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);

  const drinkText = data.drinkPairing
    ? DRINK_MAP[data.drinkPairing] || data.drinkPairing
    : "後で決める";
  const afterDrinkText = data.afterDinnerDrink
    ? DRINK_MAP[data.afterDinnerDrink] || data.afterDinnerDrink
    : "後で決める";

  await client.sendEmail({
    From: "no-reply@kuku81.com",
    To: "kuku81com@gmail.com",
    Cc: "i@siah.sg",
    Subject: `HAKO DINING 新規予約: ${data.name}様 (${data.date} ${data.time})`,
    HtmlBody: `
      <h2>新規予約</h2>
      <p><strong>お名前:</strong> ${data.name}</p>
      <p><strong>メールアドレス:</strong> ${data.email}</p>
      <p><strong>電話番号:</strong> ${data.phone}</p>
      <p><strong>人数:</strong> ${data.partySize}名</p>
      <p><strong>日付:</strong> ${data.date}</p>
      <p><strong>時間:</strong> ${data.time}</p>
      <p><strong>食事のドリンク:</strong> ${drinkText}</p>
      <p><strong>食後の一杯:</strong> ${afterDrinkText}</p>
    `,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    email,
    phone,
    partySize,
    date,
    time,
    drinkPairing,
    afterDinnerDrink,
  } = body;

  // Validate required fields
  if (!name || !email || !phone || !partySize || !date || !time) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const VALID_DRINK_PAIRINGS = [
    "herby-baby",
    "bitter-sour",
    "fresh-paloma",
    "",
  ];
  if (drinkPairing && !VALID_DRINK_PAIRINGS.includes(drinkPairing)) {
    return NextResponse.json(
      { error: "Invalid drink pairing selection" },
      { status: 400 },
    );
  }

  const VALID_AFTER_DINNER_DRINKS = ["orange-brew", "dark-roast", ""];
  if (
    afterDinnerDrink &&
    !VALID_AFTER_DINNER_DRINKS.includes(afterDinnerDrink)
  ) {
    return NextResponse.json(
      { error: "Invalid after dinner drink selection" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  if (!/^[0-9+\-() ]{7,}$/.test(phone)) {
    return NextResponse.json(
      { error: "Invalid phone number" },
      { status: 400 },
    );
  }

  const size = Number(partySize);
  if (!Number.isInteger(size) || size < 1 || size > 8) {
    return NextResponse.json(
      { error: "Party size must be between 1 and 8" },
      { status: 400 },
    );
  }

  if (!VALID_DATES.includes(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  if (!VALID_TIMES.includes(time)) {
    return NextResponse.json({ error: "Invalid time" }, { status: 400 });
  }

  console.log("New reservation:", {
    name,
    email,
    phone,
    partySize: size,
    date,
    time,
    drinkPairing,
    afterDinnerDrink,
  });

  await sendNotificationEmail({
    name,
    email,
    phone,
    partySize: size,
    date,
    time,
    drinkPairing,
    afterDinnerDrink,
  });

  return NextResponse.json({ success: true });
}
