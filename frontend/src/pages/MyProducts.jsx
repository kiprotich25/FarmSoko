import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard"; // Reuse existing card component

export default function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const res = await API.get("/products/my");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch my products", err);
      }
    };
    fetchMyProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Posted Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
