import { NextResponse } from "next/server";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const admin = await Admin.create({ email, password });
  return NextResponse.json(admin);
}
