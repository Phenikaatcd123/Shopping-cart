import type { CartItem as Item } from "../types/product";
import { useCart } from "../context/CartContext";

interface Props {
  readonly item: Item;
}

export default function CartItem({ item }: Props) {
  const { increase, decrease, removeItem } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />

      <div>
        <h4>{item.title}</h4>
        <p>${item.price}</p>

        <div>
          <button onClick={() => decrease(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increase(item.id)}>+</button>
        </div>

        <button onClick={() => removeItem(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}
