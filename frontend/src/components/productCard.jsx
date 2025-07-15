import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CategoryBadge from "./CategoryBadge";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/products/${product._id}`)}
      className="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <CardContent className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <CategoryBadge category={product.category} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="text-green-700 font-bold">Ksh {product.price}</p>
      </CardContent>
    </Card>
  );
}
