import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";
import ManageUsers from "./pages/ManageUsers";
import NotFound from "./pages/NotFound";
import ManageProducts from "./pages/ManageProducts";
export default function App() {
  return (

    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />

      <Route 
        path="/products"
        element={
          <ProtectedRoute>
            <ManageProducts />
          </ProtectedRoute>
        }
      />
    <>
      <h1> Welcome to the Shopping Cart 🛒</h1>

      <div className="layout">
        <ProductList />
        <Cart />
      </div>
    </>
    </Routes>
  );
}
