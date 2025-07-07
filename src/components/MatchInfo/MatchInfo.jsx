import { useAppContext } from "../../context/Context";
import defaultPfp from "../../assets/img/chessDefaultProfilePicture.png";
import "./MatchInfo.css";

export const MatchInfo = () => {
  const { appState } = useAppContext();
  const turnText = appState.turn === 'w' ? 'blanco' : 'negro';
  const enemyPfp = undefined || defaultPfp; // en vez de undefined le preguntaremos a la API por la imagen

  return (
    <div className="match-info">
      <div className="left-container">
        <p>Turno: {turnText}</p>
      </div>
      <div className="right-container">
        <p>Oponente:</p>
        <img src={enemyPfp} alt="Foto de perfil del oponente" />
      </div>
    </div>
  );
};
