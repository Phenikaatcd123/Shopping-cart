import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart, total, clearCart } = useCart();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>

      {cart.length > 0 && (
        <button onClick={clearCart}>
          Clear cart
        </button>
      )}
    </div>
  );
}
