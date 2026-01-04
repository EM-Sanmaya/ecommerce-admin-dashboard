import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  console.log("LOGIN ATTEMPT:", email, password);

  await connectDB();

  const admin = await Admin.findOne({ email });
  console.log("ADMIN FOUND:", !!admin);

  if (!admin) {
    return NextResponse.json({ error: "No admin" }, { status: 401 });
  }

  console.log("HASH IN DB:", admin.password);

  const match = await bcrypt.compare(password, admin.password);
  console.log("PASSWORD MATCH:", match);

  if (!match) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin-auth", "true", {
    httpOnly: true,
    path: "/",
  });

  return res;
}
