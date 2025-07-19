import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CategoryBadge from "./CategoryBadge";

export default function ProductCard({ product, showControls=false }) {
  const navigate = useNavigate();
  console.log("showControls:", showControls);
  console.log("ProductCard props:", { product, showControls });


  return (
    <Card
      onClick={() => navigate(`/products/${product._id}`)}
      className="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer p-2"
    >{product.imageUrl ? (
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover rounded-xl"
      />
    ): null}
      <CardContent className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <CategoryBadge category={product.category} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="text-green-700 font-bold">Ksh {product.price}</p>
              {showControls && (
        <div className="flex gap-2">
          <Button onClick={(e) => {
            e.stopPropagation();
            onEdit(product);
          }}>
            Edit
          </Button>
          <Button onClick={(e) => {
            e.stopPropagation();
            onDelete(product._id);
          }}>
            Delete
          </Button>
        </div>
      )}

      </CardContent>
      
    </Card>
  );
}
