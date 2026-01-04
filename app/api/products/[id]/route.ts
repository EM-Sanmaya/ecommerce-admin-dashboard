import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(_: Request, { params }: Params) {
  try {
    await connectDB();

    await Product.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}
