import { NextResponse } from "next/server";
import db from "../../../lib/db";

db.prepare(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    businessType TEXT,
    message TEXT,
    status TEXT DEFAULT 'New',
    autoReply TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

function generateReply(type: string) {
  switch (type.toLowerCase()) {
    case "it":
      return "Thank you for contacting our IT services team.";

    case "retail":
      return "Thank you for your retail inquiry.";

    default:
      return "Thank you for reaching out.";
  }
}

export async function GET() {
  try {
    const leads = db
      .prepare(
        `
        SELECT * FROM leads
        ORDER BY createdAt DESC
      `
      )
      .all();

    return NextResponse.json(leads);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      businessType,
      message,
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !businessType ||
      !message
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const autoReply = generateReply(businessType);

    db.prepare(
      `
      INSERT INTO leads
      (name, email, phone, businessType, message, autoReply)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    ).run(
      name,
      email,
      phone,
      businessType,
      message,
      autoReply
    );

    return NextResponse.json({
      message: "Lead created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, status } = body;

    db.prepare(
      `
      UPDATE leads
      SET status = ?
      WHERE id = ?
    `
    ).run(status, id);

    return NextResponse.json({
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}