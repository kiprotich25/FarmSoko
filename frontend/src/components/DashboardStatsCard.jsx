import { Card, CardContent } from "@/components/ui/card";

export default function DashboardStatsCard({ label, value }) {
  return (
    <Card className="shadow-sm border rounded-xl p-4 text-center">
      <CardContent className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-green-700">{value}</p>
      </CardContent>
    </Card>
  );
}
