import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

/* ================= GET ALL PRODUCTS ================= */
export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

/* ================= CREATE PRODUCT ================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, price, units, image } = body;

    if (!name || !category || !price || !units || !image) {
      return NextResponse.json(
        { message: "All fields including image are required" },
        { status: 400 }
      );
    }

    const priceNum = Number(price);
    const unitsNum = Number(units);

    if (priceNum <= 0 || unitsNum <= 0) {
      return NextResponse.json(
        { message: "Price and units must be positive numbers" },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.create({
      name,
      category,
      price: priceNum,
      units: unitsNum,
      image, // ✅ THIS WAS MISSING
    });

    return NextResponse.json(product, { status: 201 });
  } catch  {
    return NextResponse.json(
      { message: "Server error while creating product" },
      { status: 500 }
    );
  }
}

/* ================= UPDATE PRODUCT ================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, category, price, units, image } = body;

    await connectDB();

    await Product.findByIdAndUpdate(id, {
      name,
      category,
      price,
      units,
      ...(image && { image }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 }
    );
  }
}

/* ================= DELETE PRODUCT ================= */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Product ID missing" },
      { status: 400 }
    );
  }

  await connectDB();
  await Product.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
