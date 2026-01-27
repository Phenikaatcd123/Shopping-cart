import type { Product } from "../types/product";

interface Props {
    product: Product;
    onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: Props) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{product.title}</h2>
                <img src="{product.image}" alt="{product.title}" />
                <p>{product.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}