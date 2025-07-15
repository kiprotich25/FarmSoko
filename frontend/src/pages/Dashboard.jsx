import DashboardStatsCard from "../components/DashboardStatsCard";
import API from "../services/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0 });
    useEffect(() => {
    API.get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

    return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <DashboardStatsCard label="Total Products" value={stats.products} />
        <DashboardStatsCard label="Categories" value={stats.categories} />
      </div>
    </div>
  );
}

