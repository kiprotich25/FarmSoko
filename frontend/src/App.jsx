import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login"
import MyProducts  from "./pages/MyProducts";
import {Toaster} from 'sonner'
import UserProfile from "./pages/UserProfile";
import ProductForm from "./components/ProductForm";


function App() {
  return (
    <Router>
      <Toaster richColors position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/profile" element={<PrivateRoute>< UserProfile/></PrivateRoute>}/>
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<ProductForm isEditMode={true} />} />

        <Route path="/" element={<Home />} />
        
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }/>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="*" element={<p className="text-center mt-10">Page not found.</p>} />
      </Routes>
    </Router>
  );
}
export default App;

