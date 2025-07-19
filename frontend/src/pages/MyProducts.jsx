import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard.jsx";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    try {
      const res = await API.get("/products/my");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch my products", err);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleEdit = (product) => {
    navigate(`/products/edit/${product._id}`);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Posted Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            showControls={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
