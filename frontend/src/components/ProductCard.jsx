import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CategoryBadge from "./CategoryBadge";
import { Button } from "@/components/ui/button"; // ✅ MUST be here


export default function ProductCard({ product, showControls=false, onEdit,onDelete }) {
  const navigate = useNavigate();
  console.log("showControls:", showControls);
  console.log("ProductCard props:", { product, showControls });


  return (
    <Card
      onClick={() => navigate(`/products/${product._id}`)}
      className="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer p-1"
    >{product.imageUrl ? (
       
    
      <img
        src={product.imageUrl}
        alt={product.name}
        className="max-h-full max-w-full object-contain rounded-xl"
      />
    ): null}
      <CardContent className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <CategoryBadge category={product.category?.name || "Unknown"}  />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <p className="text-green-700 font-bold">Ksh {product.price}</p>
              {showControls && (
        <div className="flex gap-2">
          <Button onClick={(e) => {
            e.stopPropagation();
            if (onEdit)
            onEdit(product);
          }}>
            Edit
          </Button>
          <Button onClick={(e) => {
            e.stopPropagation();
            if (onDelete)
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
