import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import { fetchProducts } from "../api/productApi";
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { useDebounce } from "../hooks/useDebounce";

export default function ProductList() {
  /* =======================
   * STATE
   * ======================= */
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  /* =======================
   * DEBOUNCE SEARCH
   * ======================= */
  const debouncedSearch = useDebounce(search, 500);

  /* =======================
   * FETCH PRODUCTS
   * ======================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* =======================
   * FILTER + SEARCH LOGIC
   * ======================= */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchCategory =
        category === "" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, debouncedSearch, category]);

  /* =======================
   * RENDER STATES
   * ======================= */
  if (loading) {
    return <p className="status-text">Loading products...</p>;
  }

  if (error) {
    return <p className="status-text error">{error}</p>;
  }

  /* =======================
   * RENDER UI
   * ======================= */
  return (
    <section className="product-list">
      {/* SEARCH + FILTER */}
      <div className="product-toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <p className="status-text">No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
