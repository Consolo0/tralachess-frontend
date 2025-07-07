import "./HorizontalNavbar.css";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/Logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import getProfileImageSrc from "../../utils/getProfileImage.js";
import axios from "axios";

function HorizontalNavbar() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // URL del backend

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          });
          setToken(accessToken);
        } catch (error) {
          setToken(null);
          console.error("Error obteniendo el token de acceso:", error);
        }
      } else {
        setToken(null);
      }
    };
    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && user && token) {
        try {
          // GET para ver si el usuario ya existe
          const thisUser = await axios.get(`${backendUrl}/users/${user.sub}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(thisUser.data);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            // Si no existe se crea
            try {
              const response = await axios.post(
                `${backendUrl}/users/create`,
                {
                  auth0_id: user.sub,
                  username: user.nickname || user.name || "Usuario",
                  profileImage: null,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Usuario creado en el backend:", response.data);
              setCurrentUser(response.data);
            } catch (createErr) {
              console.error("Error creando usuario en backend:", createErr);
            }
          } else {
            console.error("Error consultando usuario en backend:", err);
          }
        }
      }
    };
    syncUserWithBackend();
  }, [isAuthenticated, user, token]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <button
            className="home-button image"
            onClick={() => navigate('/')}
          >
            <img src={Logo} alt="Inicio" />
          </button>
          <button className="landing-button" onClick={() => navigate('/')}>Inicio</button>
        </div>

        <div className="nav-right" id="nav-buttons">
          {window.location.pathname !== '/' && isAuthenticated && (
            <>
              <button className="landing-button" onClick={() => navigate('/create-match')}>Crear Partida</button>
              <button className="landing-button" onClick={() => navigate('/join-match')}>Unirme Partida</button>
              <button className="landing-button" onClick={() => navigate('/all-matches')}>Mis Partidas</button>
            </>
          )}
          {window.location.pathname !== '/how-to-play' && (
            <button className="landing-button" onClick={() => navigate('/how-to-play')}>Cómo Jugar</button>
          )}
          {window.location.pathname !== '/about-us' && (
            <button className="landing-button" onClick={() => navigate('/about-us')}>Conócenos</button>
          )}
          {!isLoading && (
            <div className="user-container">
              {isAuthenticated && currentUser ? (
                <div
                  className="user-info clickable"
                  onClick={() => navigate('/profile')}
                  tabIndex={0}
                  role="button"
                  style={{ outline: "none" }}
                  onKeyDown={e => { if (e.key === "Enter") navigate('/profile'); }}
                >
                  <img
                    src={getProfileImageSrc(currentUser.profileImage)}
                    alt="Avatar"
                    className="user-avatar"
                  />
                  <span className="user-name">{currentUser.username}</span>
                </div>
              ) : (
                <button className="landing-button" onClick={loginWithRedirect}>
                  Iniciar sesión
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      <div style={{ height: '80px' }}></div>
    </>
  );
}

export default HorizontalNavbar;