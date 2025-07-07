import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const CreateMatchHandler = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const callRef = useRef(false);

  useEffect(() => {
    if (callRef.current) return;
    
    const createMatch = async () => {
      if (!isAuthenticated || !user?.sub) {
        setError('Usuario no autenticado.');
        return;
      }

      const auth0_id = user.sub;

      try {
        const token = await getAccessTokenSilently();

        const response = await axios.post(
          `${backendUrl}/matches/create/${auth0_id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          const match_id = response.data.match.id;
          navigate('/main-page', { state: { match_id, auth0_id } });
        } else {
          setError('No se pudo crear la partida.');
        }
      } catch (err) {
        console.error(err);
        setError('Ocurrió un error al crear la partida.');
      }
    };

    callRef.current = true;
    createMatch();
  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Creando partida...</p>
      )}
    </div>
  );
};

export default CreateMatchHandler;
