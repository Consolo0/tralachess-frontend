import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./AdminForm.css";

const AdminForm = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();

      const response = await fetch("/users/set/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phraseOne: inputOne,
          phraseTwo: inputTwo,
          auth0_id: user?.sub,
        }),
      });

      if (response.ok) {
        setStatus("¡Éxito!");
      } else {
        setStatus("Error al enviar los datos.");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus("Error inesperado.");
    }
  };

  if (isLoading || !isAuthenticated) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Formulario Administrativo</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Campo 1:
          <input
            type="text"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
            required
          />
        </label>
        <label>
          Campo 2:
          <input
            type="text"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default AdminForm;
