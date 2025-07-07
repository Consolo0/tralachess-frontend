import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "./AllMatches.css";

function AllMatches() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently();

        // Obtener si el usuario es admin
        const userRes = await axios.get(`${backendUrl}/users/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userRes.status === 200 && userRes.data.isAdmin) {
          setIsAdmin(true);
        }

        // Obtener las partidas
        const matchesRes = await axios.get(`${backendUrl}/matches/all/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: (status) => status === 200 || status === 404,
        });

        if (matchesRes.status === 200) {
          setMatches(matchesRes.data);
        } else if (matchesRes.status === 404) {
          setMatches([]);
        } else {
          setError("Error inesperado al cargar las partidas.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  const handleDelete = async (matchId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta partida?")) return;

    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`${backendUrl}/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Actualizar lista local tras eliminar
      setMatches((prev) => prev.filter((m) => m.matchId !== matchId));
    } catch (err) {
      console.error("Error al eliminar partida:", err);
      alert("No se pudo eliminar la partida.");
    }
  };

  if (loading) return <div className="all-matches-loading">Cargando partidas...</div>;
  if (error) return <div className="all-matches-error">{error}</div>;
  if (matches.length === 0) return <div className="all-matches-empty">No tienes partidas disponibles.</div>;

  return (
    <div className="all-matches-container">
      <h2>Tus Partidas</h2>
      <table className="all-matches-table">
        <thead>
          <tr>
            <th>ID Partida</th>
            <th>Color</th>
            <th>Estado</th>
            <th>Turno</th>
            <th>Creada</th>
            <th>Última actualización</th>
            <th>Acción</th>
            {isAdmin && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {matches.map(({ matchId, color, matchStatus, turnToPlay, createdAt, updatedAt }) => (
            <tr key={matchId}>
              <td>{matchId}</td>
              <td>{color === "w" ? "Blanco" : "Negro"}</td>
              <td>{matchStatus || "Desconocido"}</td>
              <td>{turnToPlay === "w" ? "Blanco" : "Negro"}</td>
              <td>{new Date(createdAt).toLocaleString()}</td>
              <td>{new Date(updatedAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn-play"
                  onClick={() =>
                    navigate("/main-page", {
                      state: { match_id: matchId, auth0_id: user.sub },
                    })
                  }
                >
                  Jugar
                </button>
              </td>
              {isAdmin && (
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(matchId)}
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllMatches;
