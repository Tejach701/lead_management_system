import { NextResponse } from "next/server";
import { openDB } from "../../../lib/db";

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
    const db = await openDB();

    await db.exec(`
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
    `);

    const leads = await db.all(`
      SELECT * FROM leads
      ORDER BY createdAt DESC
    `);

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

    const { name, email, phone, businessType, message } = body;

    if (!name || !email || !phone || !businessType || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const autoReply = generateReply(businessType);

    const db = await openDB();

    await db.exec(`
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
    `);

    await db.run(
      `
      INSERT INTO leads
      (name, email, phone, businessType, message, autoReply)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [name, email, phone, businessType, message, autoReply]
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

    const db = await openDB();

    await db.run(
      `
      UPDATE leads
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

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