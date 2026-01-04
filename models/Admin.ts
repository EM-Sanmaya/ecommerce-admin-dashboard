import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface AdminDocument extends mongoose.Document {
  email: string;
  password: string;
}

const AdminSchema = new Schema<AdminDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// ✅ HASH HERE (ONLY HERE)
AdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.Admin ||
  mongoose.model<AdminDocument>("Admin", AdminSchema);
