// AddProduct.jsx
import ProductForm from "../components/ProductForm";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {useAuth} from "@/contexts/AuthContext"

export default function AddProduct() {
  const navigate = useNavigate();
  const { user } = useAuth();

 const handleAdd = async (formData) => {
  try {
    const token = localStorage.getItem("token");
   // const user = JSON.parse(localStorage.getItem("user")); // must store user after login

    // Add seller field to the form data
    const productData = {
      ...formData,
      price: Number(formData.price),
      seller: user?.id, // or user?._id depending on how you stored it
    };

    console.log("Sending product data:", productData);

    await API.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    toast.success("Product posted successfully!");
    navigate("/");
  } catch (err) {
    console.error("Error posting product:", err.response?.data || err.message);
    toast.error(err.response?.data?.error || "Failed to post product.");
  }
};

    return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Post a New Product</h1>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}

