// AddProduct.jsx
import ProductForm from "../components/ProductForm";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    
     console.log("Product sending:", formData);
    try {
      const res = await API.post("/products", formData);
      toast.success("Product posted successfully!");
      navigate("/"); // Go to homepage or dashboard
    
    } catch (err) {

      console.error(err);
      toast.error("Failed to post product.");
    }
  };
    return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Post a New Product</h1>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
}

