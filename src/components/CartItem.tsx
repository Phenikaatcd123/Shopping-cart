import { memo, useCallback } from "react";
import type { CartItem } from "../types/product";
import { useCart } from "../context/CartContext";

interface Props {
  item: CartItem;
}

function CartItemComponent({ item }: Props) {
  const { increase, decrease } = useCart();

  const onIncrease = useCallback(() => {
    increase(item.id);
  }, [increase, item.id]);

  const onDecrease = useCallback(() => {
    decrease(item.id);
  }, [decrease, item.id]);

  return (
    <div className="cart-item">
      <span>{item.title}</span>
      <button onClick={onDecrease} disabled={item.quantity === 0}>-</button>
      <span>{item.quantity}</span>
      <button onClick={onIncrease}>+</button>
    </div>
  );
}

export default memo(CartItemComponent);
