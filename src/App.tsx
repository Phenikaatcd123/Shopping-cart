import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import cartIcon from "./assets/icons/shopping-cart-svgrepo-com.svg";
export default function App() {
  return (
    <>
      <h1><img src={cartIcon} alt="Shopping Cart Icon" /> Welcome to the Shopping Cart</h1>

      <div className="layout">
        <ProductList />
        <Cart />
      </div>
    </>
  );
}
