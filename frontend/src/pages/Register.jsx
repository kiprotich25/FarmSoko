import { useState } from "react";
import API from "../services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const navigate = useNavigate();
    const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };
    const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirm) {
    toast.error("Passwords do not match");
    return;
  }

  const payload = {
    username: form.name,     // ✅ match backend
    email: form.email,
    password: form.password,
  };

  console.log("Sending to backend:", payload); // ✅ debug

  try {
    const res = await API.post("/auth/register", payload);
    toast.success("Registered!");
    navigate("/login");
  } catch (err) {
    console.error("Register error:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Registration failed.");
  }
};

    return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input type="password" name="confirm" value={form.confirm} onChange={handleChange} />
        </div>
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </div>
  );
}



