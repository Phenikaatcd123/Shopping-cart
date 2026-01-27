import { memo } from "react";
import type { Product } from "../types/product";
import { useModal } from "../hooks/useModal";
import ProductDetailModal from "./ProductDetailModal";

interface Props {
  product: Product;
}

function ProductItem({ product }: Props) {
  const modal = useModal <Product>();

  return (
    <>
      <div className="product-card" onClick={() => modal.open(product)}>
        <img src={product.image} alt={product.title} />
        <h4>{product.title}</h4>
      </div>

      {modal.isOpen && modal.data && (
        <ProductDetailModal
          product={modal.data}
          onClose={modal.close}
        />
      )}
    </>
  );
}

export default memo(ProductItem);
