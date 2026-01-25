import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
export default function App() {
  return (
    <>
      <h1> Welcome to the Shopping Cart 🛒</h1>

      <div className="layout">
        <ProductList />
        <Cart />
      </div>
    </>
  );
}
