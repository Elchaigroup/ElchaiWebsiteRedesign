import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      sha: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || null,
      time: new Date().toISOString(),
    },
    { headers: { "cache-control": "no-store" } }
  );
}
