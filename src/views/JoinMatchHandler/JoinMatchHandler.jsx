import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const JoinMatchHandler = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const joinMatch = async () => {
      if (!isAuthenticated || !user?.sub) {
        setError('Usuario no autenticado.');
        return;
      }

      const auth0_id = user.sub;

      try {
        const token = await getAccessTokenSilently();

        const response = await axios.post(
          `${backendUrl}/matches/join/${auth0_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const match_id = response.data.matchJoined.id;
          navigate('/main-page', { state: { match_id, auth0_id } });
        } else {
          setError('No se pudo unir a la partida.');
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          setError('No hay partidas disponibles para unirse. Intenta crear una.');
        } else {
          setError('Ocurrió un error al intentar unirse a la partida.');
        }
      }
    };

    joinMatch();
  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Buscando partida para unirse...</p>
      )}
    </div>
  );
};

export default JoinMatchHandler;
