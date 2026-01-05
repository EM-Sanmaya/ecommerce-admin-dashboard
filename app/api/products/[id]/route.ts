// FORCE_REBUILD_NEXT_ROUTE_HANDLER
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  await connectDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
