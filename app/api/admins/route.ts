import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

/* ================= GET ADMINS ================= */
export async function GET() {
  await connectDB();

  const admins = await Admin.find().select("email");
  return NextResponse.json(admins);
}

/* ================= CREATE ADMIN ================= */
export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Admin already exists" },
      { status: 409 }
    );
  }

  // 🔑 IMPORTANT: plain password (schema will hash)
  await Admin.create({ email, password });

  return NextResponse.json({
    success: true,
    message: "Admin created successfully",
  });
}
