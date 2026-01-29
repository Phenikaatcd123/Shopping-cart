import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="page-container">
      <Link to="/">← Back</Link>

      <h2>{product.title}</h2>

      <img src={product.image} width={250} alt="image here" />

      <p>{product.description}</p>

      <h3>${product.price}</h3>
    </div>
  );
}

export default ProductDetail;
