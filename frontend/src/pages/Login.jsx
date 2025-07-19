import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";


export default function Login() {
  const { user,setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  
  // ✅ Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err); // 🐞 Optional debugging
      toast.error("Invalid credentials");
    }
  };

  // ✅ RETURN IS NOW OUTSIDE THE FUNCTION
  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
        <p className="text-sm text-center text-muted-foreground mt-4">
        Don't have an account?{" "}
        <Link to="/register" className="text-green-700 hover:underline font-medium">
        Sign up
        </Link>
</p>

      </form>
    </div>
  );
}
