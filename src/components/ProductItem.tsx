import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

interface Props {
  readonly product: Product;
}

export default function ProductItem({ product }: Props) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>${product.price}</p>

      <button onClick={handleAdd}>
        Add to cart
      </button>
    </div>
  );
}
