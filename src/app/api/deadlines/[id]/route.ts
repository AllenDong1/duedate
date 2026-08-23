import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDeadlines } from "@/lib/mongodb";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "bad id" }, { status: 400 });
  }

  const col = await getDeadlines();
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  if (!res.deletedCount) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
