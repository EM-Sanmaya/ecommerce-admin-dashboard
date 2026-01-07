export const runtime = "nodejs";

import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import type {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
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

    return NextResponse.json({
      url: uploadResult.secure_url,
    });
  } catch {
    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    );
  }
}
