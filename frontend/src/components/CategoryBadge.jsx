
import { Badge } from "@/components/ui/badge";

export default function CategoryBadge({ category }) {
  const categoryName = typeof category === "string" ? category : category?.name;

  return (
    <Badge variant="outline" className="text-xs text-green-700 border-green-700">
      {categoryName ?? "Unknown"}
    </Badge>
  );
}
