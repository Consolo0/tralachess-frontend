import "./AllUsers.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently();

        // Verificar si el usuario actual es admin
        const userRes = await axios.get(`${backendUrl}/users/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.data.isAdmin) {
          setIsAdmin(false);
          return;
        }

        setIsAdmin(true);

        // Obtener todos los usuarios
        const allUsersRes = await axios.get(`${backendUrl}/users/all/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(allUsersRes.data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
        setError("No se pudo cargar la información de los usuarios.");
      }
    };

    fetchUsers();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const handleDelete = async (auth0_id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`${backendUrl}/users/${auth0_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u.auth0_id !== auth0_id));
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      alert("No se pudo eliminar el usuario.");
    }
  };

  if (!isAdmin) {
    return <p className="private-info-warning">Información privada</p>;
  }

  if (error) {
    return <p className="private-info-warning">{error}</p>;
  }

  return (
    <div className="all-users-container">
      <h2 className="all-users-title">Todos los Usuarios</h2>
      <table className="all-users-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Descripción</th>
            <th>Victorias</th>
            <th>Empates</th>
            <th>Derrotas</th>
            <th>Admin</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.auth0_id}>
              <td>{u.username}</td>
              <td>{u.description}</td>
              <td>{u.wins}</td>
              <td>{u.draws}</td>
              <td>{u.loss}</td>
              <td>{u.isAdmin ? "Sí" : "No"}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(u.auth0_id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
