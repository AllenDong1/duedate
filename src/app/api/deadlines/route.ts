import { NextResponse } from "next/server";
import { getDeadlines } from "@/lib/mongodb";

export async function GET() {
  const col = await getDeadlines();
  const rows = await col.find().sort({ due: 1 }).toArray();
  return NextResponse.json(rows.map((r) => ({ ...r, _id: String(r._id) })));
}

export async function POST(req: Request) {
  const { title, due } = await req.json();
  if (!title || !due) {
    return NextResponse.json({ error: "title and due required" }, { status: 400 });
  }

  const doc = { title, due, created: new Date().toISOString() };
  const col = await getDeadlines();
  const { insertedId } = await col.insertOne(doc);
  return NextResponse.json({ _id: String(insertedId), ...doc }, { status: 201 });
}
