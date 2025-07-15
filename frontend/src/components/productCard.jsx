import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product }) {
  return (
    <Card className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <CardContent className="p-4 space-y-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-muted-foreground text-sm">{product.description}</p>
        <p className="text-green-700 font-bold">Ksh {product.price}</p>
        <p className="text-xs text-right text-gray-400">{product.category}</p>
      </CardContent>
    </Card>
  );
}
