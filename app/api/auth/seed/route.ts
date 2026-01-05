export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  // ⛔ Block execution during build
  if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
    return NextResponse.json(
      { message: "Seed route disabled during build" },
      { status: 200 }
    );
  }

  await connectDB();

  // your seed logic here

  return NextResponse.json({ success: true });
}
