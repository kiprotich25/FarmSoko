import { useState, useEffect } from "react";
import API from "../services/api";

export default function FilterBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, category });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-1 rounded"
      >
        Filter
      </button>
    </form>
  );
}
