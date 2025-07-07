import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/Context';
import './MatchEndingPopUp.css';

export const MatchEndingPopUp = () => {
  const {appState} = useAppContext();
  const navigate = useNavigate();
  const winner = appState.status;

  if (winner !== 'b' && winner !== 'w' && winner !== 'draw'){
    return null
  }
  return (
    <div className='overlay'>
      <div className='win-announce-box'>
        {winner !== 'draw' ?
        <p>GANADOR: <b>{winner === 'b' ? "negro" : "blanco"}</b></p>
        : <p>EMPATE</p>}
      </div>
      <div className='button-set-up'>
        <button className="landing-button" onClick={() => navigate('/')}>Página Principal</button>
      </div>
    </div>
  );
}

export default MatchEndingPopUp;