import { Badge } from "@/components/ui/badge";

export default function CategoryBadge({ category }) {
  return (
    <Badge variant="outline" className="text-xs text-green-700 border-green-700">
      {category}
    </Badge>
  );
}