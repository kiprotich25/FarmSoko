import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import CategoryBadge from "../components/CategoryBadge";
import UserAvatar from "../components/UserAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log("Product details:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

    if (loading) return <LoadingSpinner />;
  if (!product) return <p className="text-center py-10">Product not found.</p>;


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link to="/">
        <Button variant="ghost" className="mb-2">&larr; Back to Products</Button>
      </Link>
      <Card className="overflow-hidden rounded-xl shadow">
        {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-72 w-full object-cover"
        />
        ): null}
        <CardContent className="p-6 space-y-6">

        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <CategoryBadge category={product.category} />
        </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
            {product.description}
            </p>
            <p className="text-green-700 font-semibold text-xl">
            Ksh {product.price}
            </p>
            <div className="flex items-center gap-4">
              <UserAvatar username={product.seller?.username || product.seller?.email || "Seller"} />
                <div>
                  <p className="font-medium">
                    {product.seller?.username || product.seller?.email || "Unknown Seller"}
                  </p>
                  <p className="text-xs text-muted-foreground">Seller</p>
                </div>

            </div>
            
     <Button
  className="mt-4 w-full"
  onClick={() => {
    const email = product.seller?.email;
    if (!email) return;
    const subject = `Interest in ${product.name}`;
    const body = `Hi, I'm interested in your product "${product.name}" listed on FarmSoko. Please provide more details.`;
    window.open( `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }}
  disabled={!product.seller?.email}
>
  Contact Seller
</Button>
        </CardContent>
      </Card>
    </div>
  );
}





