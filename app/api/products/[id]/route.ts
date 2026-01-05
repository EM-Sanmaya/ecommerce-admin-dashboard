import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    await connectDB();
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
