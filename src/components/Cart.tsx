import { memo, useCallback, useMemo } from "react";
import type { CartItem as CartItemType } from "../types/product";
import { useCart } from "../context/CartContext";

/* =======================
 * CART ITEM COMPONENT
 * ======================= */
interface CartItemProps {
  item: CartItemType;
}

const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const { increase, decrease } = useCart();

  const handleIncrease = useCallback(() => {
    increase(item.id);
  }, [increase, item.id]);

  const handleDecrease = useCallback(() => {
    decrease(item.id);
  }, [decrease, item.id]);

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        className="cart-item-image"
      />

      <div className="cart-item-info">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>

        <div className="cart-item-actions">
          <button
            onClick={handleDecrease}
            disabled={item.quantity === 0}
            className="btn"
          >
            -
          </button>

          <span className="cart-item-quantity">{item.quantity}</span>

          <button
            onClick={handleIncrease}
            className="btn"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
});


export default function Cart() {
  const { items } = useCart();

  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [items]);

  if (items.length === 0) {
    return <p className="cart-empty">Your cart is empty.</p>;
  }

  return (
    <aside className="cart">
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-list">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-footer">
        <span className="cart-total-label">Total:</span>
        <span className="cart-total-price">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </aside>
  );
}
