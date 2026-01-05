export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  await connectDB();

  await Admin.deleteMany({});

  // ✅ PLAIN PASSWORD (schema will hash)
  await Admin.create({
    email: "admin@dashboard.com",
    password: "admin123",
  });

  return NextResponse.json({
    message: "Admin created correctly",
  });
}
