// ProductForm.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import API from "@/services/api";
import { useEffect } from "react";



export default function ProductForm ({onSubmit }) {
    const [categories, setCategories] = useState([]);
    const [formData,setFormData] = useState({
        name:"",
        price: "",
        description: "",
        imageUrl: "",
        category: "" 
    });
     useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategorySelect = (value) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
    <Card className="max-w-xl mx-auto p-6 rounded-2xl shadow-xl">
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                    <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Fresh Carrots"
                        />
                 </div>
                 <div>
                    <Label htmlFor="price">Price (Ksh)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 150"
                        />
                 </div>
                 <div>
                    <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your product..."
                            rows={3}
                        />
                 </div>
                 <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                        />
                 </div>
                 <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={handleCategorySelect}>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat._id} value={cat.name}>
                            {cat.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button type="submit" className="w-full">
                  Post Product
                </Button>
            </form>
      </CardContent>
    </Card>
  );
}









