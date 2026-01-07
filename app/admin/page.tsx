export const dynamic = "force-dynamic";
import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import DashboardCharts from "./DashboardCharts";


type ProductType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  units: number;
  image: string; // ✅ added (Cloudinary support)
};

export default async function AdminDashboard() {
  await connectDB();

  // ✅ Fetch & safely serialize MongoDB docs
  const rawProducts = await Product.find().lean();
  const products: ProductType[] = JSON.parse(
    JSON.stringify(rawProducts)
  );

  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.units,
    0
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <strong>Total Inventory Value:</strong> ₹{totalValue}
      </div>

      {/* Charts use plain objects only */}
      <DashboardCharts products={products} />
    </div>
  );
}
