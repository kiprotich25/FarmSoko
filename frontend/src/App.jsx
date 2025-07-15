import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<p className="text-center mt-10">Page not found.</p>} />
      </Routes>
    </Router>
  );
}
export default App;

