import { Link , useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { pathname } = useLocation();
    const links = [
        {name: "Home", path: "/" },
        {name: "Add Product", path: "/add-product"},
        {name: "Profile", path: "/login"}
    ];

    return (
    <nav className="bg-white border-b p-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="text-xl font-bold text-green-700">
          Farm Soko
        </Link>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={pathname === link.path ? "default" : "outline"}
                size="sm"
              >
                {link.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}


    
