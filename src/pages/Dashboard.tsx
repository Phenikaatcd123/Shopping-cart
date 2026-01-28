import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="page-container">
      <header className="header">
        <h2>Dashboard</h2>

        <div>
          <Link to="/users">Manage Users</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      {/* Truyền props xuống */}
      <SearchBar
        value={search}
        onChange={(value) => setSearch(value)}
      />

      <ProductList search={search} />
    </div>
  );
}

export default Dashboard;
