import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
  username: string;
}

function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
      return;
    }

    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="page-container">
      <h2>Manage Users</h2>

      {users.map((u) => (
        <div key={u.id} className="user-item">
          <p>Username: {u.username}</p>
          <p>Email: {u.email}</p>
        </div>
      ))}
    </div>
  );
}

export default ManageUsers;
