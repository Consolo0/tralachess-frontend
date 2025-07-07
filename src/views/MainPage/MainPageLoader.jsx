import { useState, useEffect } from "react";
import axios from "axios";
import MainPage from "./MainPage.jsx";
import GetInitialBoardPosition from "../../helpers/GetInitialBoardPosition.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

function MainPageLoader() {
  const location = useLocation();
  const { auth0_id, match_id } = location.state || {};
  const [initialState, setInitialState] = useState(null);
  const [error, setError] = useState(null);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchInitialState = async () => {
      if (!auth0_id || !match_id) {
        setError("Faltan parámetros para cargar la partida.");
        return;
      }

      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`${backendUrl}/matches/context`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { match_id, auth0_id }
          });

          const result = response.data.result;

          setInitialState({
            positions: result.positions || [GetInitialBoardPosition()],
            turn: result.turn || 'w',
            color_assigned: result.color_assigned || 'w',
            status: result.status || 'ongoing',
            movesList: result.movesList || [],
            candidateMoves: [],
            promotionSquare: null,
            castlingDirection: 'board',
          });
        } catch (err) {
          console.error("Error al obtener el contexto:", err);
          setError("No se pudo cargar la partida.");
        }
      }
    };

    fetchInitialState();
  }, []);

  if (error) return <div>{error}</div>;
  if (!initialState) return <div>Cargando partida...</div>;

  return <MainPage initialState={initialState} match_id={match_id} auth0_id={auth0_id} />;
}

export default MainPageLoader;
