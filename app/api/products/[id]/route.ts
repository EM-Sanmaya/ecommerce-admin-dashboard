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

  return NextResponse.json({ success: true });
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
