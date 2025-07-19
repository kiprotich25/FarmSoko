import { Link , useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import UserAvatar from "./UserAvatar";


export default function Navbar() {
    const { pathname } = useLocation();
    const links = [
        {name: "Home", path: "/" },
        {name: "Add Product", path: "/add-product"},
        //{name: "Profile", path: "/login"}
    ];
    const { user, logout } = useAuth();


    return (
  <nav className="bg-white border-b p-4 shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      
      <Link to="/" className="text-xl font-bold text-green-700">
        Farm Soko
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/">
          <Button
            variant={pathname === "/" ? "default" : "outline"}
            size="sm"
          >
            Home
          </Button>
        </Link>

        {user ? (
          <>
            <Link to="/add-product">
              <Button
                variant={pathname === "/add-product" ? "default" : "outline"}
                size="sm"
              >
                Add Product
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button
                variant={pathname === "/dashboard" ? "default" : "outline"}
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
            
            <Link to="/profile">
              <UserAvatar username={user.username} />
            </Link>
            <Button variant="outline" onClick={logout} size="sm">
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button
              variant={pathname === "/login" ? "default" : "outline"}
              size="sm"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  </nav>
);
}
