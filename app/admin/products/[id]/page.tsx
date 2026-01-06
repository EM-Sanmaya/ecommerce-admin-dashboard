import Product from "@/models/Product";
import { connectDB } from "@/lib/mongodb";
import EditProductForm from "./EditProductForm";

type Props = {
  params: { id: string };
};

export default async function EditProductPage({ params }: Props) {
  await connectDB();

  const product = await Product.findById(params.id).lean();

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Edit Product</h1>

      <p><strong>Name:</strong> {product.name}</p>

      <EditProductForm
  product={{
    _id: product._id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    units: product.units,
    image: product.image,
  }}
/>

    </div>
  );
}
