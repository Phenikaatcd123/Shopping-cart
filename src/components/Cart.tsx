import Button from "./ui/Button";
import { useCart } from "../context/CartContext";
import "../styles/cart.css";
import plusIcon from "./assets/icons/plus-large-svgrepo-com.svg"
import minusIcon from "./assets/icons/minus-svgrepo-com.svg"
import trashIcon from "./assets/icons/trash-svgrepo-com.svg"
import cartIcon from "./assets/icons/shopping-cart-svgrepo-com.svg"
export default function Cart() {
  const {
    cart,
    increase,
    decrease,
    removeItem,
    clearCart,
    total
  } = useCart();

  if (cart.length === 0) {
    return <p className="cart-empty">Your cart is empty <img src={cartIcon} alt="cartIcon" /></p>;
  }

  return (
    <div className="cart-wrapper">
      <h2>Your Cart</h2>

      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <img
            src={item.image}
            alt={item.title}
          />

          <div className="cart-info">
            <p className="cart-title">{item.title}</p>
            <p className="cart-price">${item.price}</p>

            <div className="qty-control">
              <Button
                size="sm"
                variant="ghost"
                disabled={item.quantity === 0}
                onClick={() => decrease(item.id)}
              >
                <img src={minusIcon} alt="Decrease quantity" />
              </Button>

              <span>{item.quantity}</span>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => increase(item.id)}
              >
                <img src={plusIcon} alt="Increase quantity" />
              </Button>
            </div>
          </div>

          <Button
            size="sm"
            variant="danger"
            onClick={() => removeItem(item.id)}
          >
            <img src={trashIcon} alt="Remove item"/>Remove
          </Button>
        </div>
      ))}

      <div className="cart-footer">
        <p>Total: <b>${total.toFixed(2)}</b></p>

        <Button
          variant="danger"
          onClick={clearCart}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}
