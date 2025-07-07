import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import getProfileImageSrc from "../../utils/getProfileImage.js";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const [profile, setProfile] = useState(null);
  const [editData, setEditData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        const res = await axios.get(`${backendUrl}/users/${user.sub}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setEditData({
          username: res.data.username,
          description: res.data.description,
        });
        setPreviewImage(getProfileImageSrc(res.data.profileImage));
        console.log("Perfil cargado:", res.data);
      }
    };
    fetchProfile();
  }, [isAuthenticated, user, getAccessTokenSilently, backendUrl]);

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);

        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          setEditData({
            ...editData,
            profileImage: Array.from(uint8Array) 
          });
        };
        fileReader.readAsArrayBuffer(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await getAccessTokenSilently();
    await axios.patch(
      `${backendUrl}/users/${user.sub}`,
      editData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setLoading(false);
    navigate("/");
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres borrar tu perfil? Esta acción no se puede deshacer.")) {
      setLoading(true);
      const token = await getAccessTokenSilently();
      await axios.delete(`${backendUrl}/users/${user.sub}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      logout({ logoutParams: { returnTo: window.location.origin } });
    }
  };

  if (!profile) return <div className="profile-container">Cargando...</div>;

  return (
    <div className="profile-container">
      <h2>Editar Perfil</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-image-section">
          <img
            src={previewImage || "/default-avatar.png"}
            alt="Avatar"
            className="profile-avatar"
          />
          <label className="profile-image-label">
            Cambiar foto
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <h6>La foto debe pesar menos de 60 Kb</h6>
        </div>
        <div className="profile-fields">
          <label>
            Nombre de usuario
            <input
              type="text"
              name="username"
              value={editData.username || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Descripción
            <textarea
              name="description"
              value={editData.description || ""}
              onChange={handleInputChange}
              rows={3}
            />
          </label>
        </div>
        <div className="confirm-btns">
          <button className="profile-save-btn" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
          <button className="profile-logout-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Cerrar sesión
          </button>
          <button className="profile-delete-btn" onClick={handleDelete} disabled={loading}>
            {loading ? "Borrando..." : "Borrar perfil"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;