import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const API = "https://fakestoreapi.com/products";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const[currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

 
  const validate = () => {
    if (!title.trim()) {
      setError("Title is required");
      return false;
    }

    if (!price || Number(price) <= 0) {
      setError("Price must be > 0");
      return false;
    }

    if (!image.match(/\.(jpg|png|jpeg)$/i)) {
      setError("Image must be JPG/PNG");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    const data = {
      title,
      price: Number(price),
      image,
      description: "New product",
    };

    try {
      if (editingId) {
        const res = await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const updated = await res.json();

        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p))
        );
      }

      else {
        const res = await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const created = await res.json();

        setProducts((prev) => [created, ...prev]);
      }

      setTitle("");
      setImage("");
      setPrice("");

      setCurrentPage(1);
    } catch {
      alert("API Error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (p: Product) => {
    setTitle(p.title);
    setPrice(String(p.price));
    setImage(p.image);

    setEditingId(p.id);
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setImage("");
    setEditingId(null);
  };

  const totalPages = Math.ceil(products.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const currentProducts =  products.slice(start, end);
  return (
    <div className="page-container">
      <h2>Manage Products</h2>

      {/* FORM */}
      <div className="form-box">
        <h3>{editingId ? "Update Product" : "Create Product"}</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price *"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Image URL (.jpg/.png)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        {editingId && (
          <button onClick={resetForm}>Cancel</button>
        )}
      </div>


        {/* LIST */}
      <h3>Products</h3>

      {currentProducts.map((p) => (
        <div key={p.id} className="product-row">
          <img src={p.image} width={50} alt="image here"/>

          <span>{p.title}</span>

          <span>${p.price}</span>

          <button onClick={() => handleEdit(p)}>Edit</button>

          <button onClick={() => handleDelete(p.id)}>
            Delete
          </button>
        </div>
      ))}

      {/* PAGINATION */}
<div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    Prev
  </button>

  {Array.from({ length: totalPages }).map((_, i) => (
    <button
      key={i}
      className={currentPage === i + 1 ? "active" : ""}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    Next
  </button>
</div>

    </div>
  );
}
 
export default ManageProducts;
