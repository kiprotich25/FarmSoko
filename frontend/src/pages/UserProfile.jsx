
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard.jsx";
import { toast } from "sonner";
import ProductForm from "../components/ProductForm";


export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  useEffect(() => {
    // Fetch user info
    API.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("Failed to fetch user", err));

    // Fetch user's products
    API.get("/products/my")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await API.delete(`/products/${productId}`);
      toast.success("Product deleted");
      // Refresh product list
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete product");
    }
  };
  const handleUpdateProduct = async (updatedData) => {
    console.log("Updating with data:", updatedData);
    try {
    await API.put(`/products/${editingProduct._id}`, updatedData);
    toast.success("Product updated");

    // Refresh product list
    const res = await API.get("/products/my");
    setProducts(res.data);

    setEditingProduct(null); // close the form
  } catch (err) {
    console.error("Update failed", err);
    toast.error("Failed to update product");
  }
};


  const handleEdit = (product) => {
     setEditingProduct(product);
     setTimeout(() => {
    const editSection = document.getElementById("edit-section");
    if (editSection) {
      editSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 100)
    // Navigate to edit form or open modal
    console.log("Edit clicked for:", product);
    
  };

  if (!user) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="mb-6 border p-4 rounded shadow bg-white">
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        
      </div>
     {editingProduct && (
        <div className="mb-6 border p-4 rounded bg-gray-50" id="edit-section">
            <h2 className="text-xl font-semibold mb-2">Edit Product</h2>
            <ProductForm
            initialData={editingProduct}
            onSubmit={handleUpdateProduct}
            />
            <button
            onClick={() => setEditingProduct(null)}
            className="mt-4 text-sm text-red-500 hover:underline"
            >
            Cancel Edit
            </button>
        </div>
        )}


      <h2 className="text-xl font-semibold mb-2">My Products To Sell:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
