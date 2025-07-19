
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard.jsx";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch user info
    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user", err));

    // Fetch user's products
    API.get("/products/my")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  if (!user) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="mb-6 border p-4 rounded shadow bg-white">
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Optional profile pic here */}
      </div>

      <h2 className="text-xl font-semibold mb-2">My Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            showControls={true}
            onEdit={(product) => console.log("Edit", product)}
            onDelete={(id) => console.log("Delete", id)}
          />
        ))}
      </div>
    </div>
  );
}
