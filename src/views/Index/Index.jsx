import './Index.css';
import { useNavigate } from 'react-router-dom';
import draw from '../../../src/assets/img/Chess_drawing.jpg'; 
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchIsAdmin = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently();
        const res = await axios.get(`${backendUrl}/users/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200 && res.data.isAdmin) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error verificando si el usuario es admin:", error);
      }
    };

    fetchIsAdmin();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (    
    <div className="landing-container">
      <img src={draw} alt="Juego de ajedrez con poderes" className="landing-image" />
      <div className="landing-text">
        <h1>Chess project</h1>
        <p>
          Revoluciona tu forma de jugar ajedrez. Usa cartas mágicas, activa habilidades y reta a jugadores en tiempo real.
        </p>
        
        <div className="landing-buttons">
          {isAuthenticated ? (
            <>
              <button className="landing-button" onClick={() => navigate('/create-match')}>Crear Partida</button>
              <button className="landing-button" onClick={() => navigate('/join-match')}>Unirme Partida</button>
              <button className="landing-button" onClick={() => navigate('/all-matches')}>Mis Partidas</button>
              {isAdmin && (
                <button className="landing-button" onClick={() => navigate('/all-users')}>
                  Todos los Usuarios
                </button>
              )}
            </>
          ) : (
            <button className="landing-button" onClick={loginWithRedirect}>
              Iniciar sesión
            </button>
          )}
        </div>
        
        <div className="chess-icons">
          ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
        </div>
        <div className="features-section">
          <h2>¿Por qué jugar?</h2>
          <ul className="features-list">
            <li>✦ Habilidades únicas para usar con las piezas</li>
            <li>♠ Sistema estratégico de cartas</li>
            <li>⇄ Partidas en línea y en tiempo real</li>
            <li>☰ Historial, estadísticas y más</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
