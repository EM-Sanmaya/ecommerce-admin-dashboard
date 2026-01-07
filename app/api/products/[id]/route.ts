export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

// ================= UPDATE PRODUCT (JSON ONLY) =================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await req.json();

    await Product.findByIdAndUpdate(params.id, {
      name: body.name,
      category: body.category,
      price: body.price,
      units: body.units,
    });

    revalidatePath("/admin");
    revalidatePath("/admin/products");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

// ================= DELETE PRODUCT =================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    await Product.findByIdAndDelete(params.id);

    revalidatePath("/admin");
    revalidatePath("/admin/products");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}
