import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import UserAvatar from "./UserAvatar";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white border-b p-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-green-700">
          Farm Soko
        </Link>

        {/* Hamburger Icon for Small Screens */}
        <button
          className="lg:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-4">
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
                  variant={
                    pathname === "/add-product" ? "default" : "outline"
                  }
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-2 flex flex-col gap-2 px-4">
          <Link to="/" onClick={closeMenu}>
            <Button
              variant={pathname === "/" ? "default" : "outline"}
              className="w-full"
            >
              Home
            </Button>
          </Link>

          {user ? (
            <>
              <Link to="/add-product" onClick={closeMenu}>
                <Button
                  variant={
                    pathname === "/add-product" ? "default" : "outline"
                  }
                  className="w-full"
                >
                  Add Product
                </Button>
              </Link>

              <Link to="/dashboard" onClick={closeMenu}>
                <Button
                  variant={pathname === "/dashboard" ? "default" : "outline"}
                  className="w-full"
                >
                  Dashboard
                </Button>
              </Link>

              <Link to="/profile" onClick={closeMenu}>
                <div className="w-full">
                  <UserAvatar username={user.username} />
                </div>
              </Link>

              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <Button
                variant={pathname === "/login" ? "default" : "outline"}
                className="w-full"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
