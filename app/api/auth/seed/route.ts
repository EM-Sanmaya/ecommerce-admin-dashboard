export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectDB();

    const email = "admin@gmail.com";
    const password = "admin123"; // 👈 plain text on purpose

    const admin = await Admin.findOne({ email }).select("+password");

    if (admin) {
      admin.password = password; // 👈 plain
      await admin.save();

      return NextResponse.json({
        success: true,
        message: "Admin password reset successfully",
        email,
        password,
      });
    }

    await Admin.create({
      email,
      password, // 👈 plain
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      email,
      password,
    });
  } catch (error: unknown) {
    console.error("SEED ERROR:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
