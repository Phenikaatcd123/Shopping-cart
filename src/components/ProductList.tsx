import { useProducts } from "../hooks/useProducts";
import ProductItem from "./ProductItem";
import "../styles/product.css";

export default function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <h3>Loading...</h3>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid">
      {products.map(p => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}
