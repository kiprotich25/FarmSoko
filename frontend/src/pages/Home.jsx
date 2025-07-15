import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products") 
    .then((res) => {
        setProducts(res.data);
        setLoading(false);

    })
    .catch((err) => {
        console.error(err);
        setLoading(false);

    });
}, []);
      
return (
    <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Explore Farm Produce</h1>
        {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <EmptyState message="No products available." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

    
