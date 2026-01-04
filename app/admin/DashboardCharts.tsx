"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

type Product = {
  name: string;
  category: string;
  price: number;
  units: number;
};

export default function DashboardCharts({
  products,
}: {
  products: Product[];
}) {
  const categoryMap: Record<string, number> = {};

  products.forEach((p) => {
    categoryMap[p.category] =
      (categoryMap[p.category] || 0) + p.price * p.units;
  });

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
      <div>
        <h3>Inventory by Category</h3>
        <PieChart width={300} height={300}>
          <Pie data={categoryData} dataKey="value" nameKey="name" />
          <Tooltip />
        </PieChart>
      </div>

      <div>
        <h3>Units per Product</h3>
        <BarChart width={400} height={300} data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="units" fill="#6366f1" />
        </BarChart>
      </div>
    </div>
  );
}
