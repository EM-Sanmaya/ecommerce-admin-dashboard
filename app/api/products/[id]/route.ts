export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "../../../../lib/cloudinary";
import { revalidatePath } from "next/cache";


import type {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

// ================= UPDATE PRODUCT =================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

 const contentType = req.headers.get("content-type") || "";

// ✅ CASE 1: JSON update (NO IMAGE)
if (contentType.includes("application/json")) {
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
}

// ✅ CASE 2: multipart (kept for safety, not used now)
const formData = await req.formData();



  const updateData: {
    name?: string;
    category?: string;
    price?: number;
    units?: number;
    image?: string;
  } = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    price: Number(formData.get("price")),
    units: Number(formData.get("units")),
  };

  const image = formData.get("image");

  if (image instanceof File && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (
            err: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (err || !result) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      }
    );

    updateData.image = uploadResult.secure_url;
  }

  await Product.findByIdAndUpdate(params.id, updateData);
  

// ✅ revalidate after update
  revalidatePath("/admin");
  revalidatePath("/admin/products");

 return NextResponse.json({ success: true });
}
// ================= FALLBACK POST FOR UPDATE (Vercel-safe) =================
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Reuse the same logic as PUT
  return PUT(req, { params });
}

// ================= DELETE PRODUCT =================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
    // ✅ THIS IS THE FIX
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  return NextResponse.json({ success: true });
}
