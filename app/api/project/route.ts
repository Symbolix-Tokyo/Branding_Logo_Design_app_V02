import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const projectId = url.searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ error: "projectId required" }, { status: 400 });

  const raw = readFileSync(`.tmp/projects/${projectId}.json`, "utf-8");
  return NextResponse.json({ data: JSON.parse(raw) });
}