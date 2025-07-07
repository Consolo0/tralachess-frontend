import './Pieces.css';
import { useRef } from 'react';
import GetBoardBasedCoordinates from '../../../helpers/GetBoardBasedCoordinates';
import { useAppContext } from '../../../context/Context';
import {
  GenerateCandidateMoves,
  ClearCandidateMoves,
} from '../../../reducer/actions/move';
import EnPassant from '../../../helpers/EnPassant';
import { BoardUpdate } from '../../../helpers/BoardUpdate';
import StatusUpdate from '../../../helpers/StatusUpdate';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function Pieces({match_id, auth0_id}) {
  const { getAccessTokenSilently } = useAuth0();
  const ref = useRef();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { appState, dispatch } = useAppContext();

  const positions = appState.positions[appState.positions.length - 1];

  const onDragStart = async (e, piece, rank, tile) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${piece},${rank},${tile}`);

    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);

    let isMyTurn = false;
    const token = await getAccessTokenSilently();

    const isMyTurnResponse = await axios.get(
      `${backendUrl}/matches/is-my-turn`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { 
        match_id, 
        auth0_id, 
        piece:positions[rank][tile],
      }
    });

    console.log(isMyTurnResponse);
    if (isMyTurnResponse.status === 200){
      isMyTurn = isMyTurnResponse.data.result;
      console.log('estado de myTurn', isMyTurn);
    }else{
      return;
    }

    if (isMyTurn){

      const candidateMovesResponse = await axios.get(`${backendUrl}/matches/get-candidate-moves`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { match_id, auth0_id, rank, tile}
      });

      console.log(candidateMovesResponse);

      if (candidateMovesResponse.status === 200){
        console.log('data de candidate moves', candidateMovesResponse.data);

        const candidateMoves = candidateMovesResponse.data.candidate_moves;
        dispatch(GenerateCandidateMoves({ candidateMoves }));
        
      }else{
        console.log('Error de candidate moves', candidateMovesResponse.data.error);
        return;
      }
    }
  };

  const onDragEnd = async (e, piece, rank, tile) => {

    const [x, y] = GetBoardBasedCoordinates(e, ref);
    const token = await getAccessTokenSilently();

    const newPositions = positions.map((row) => [...row]);
    let isInvalidMove = true;

    console.log(`(rank, tile): (${rank}, ${tile})`);
    console.log(`(x, y): (${x}, ${y})`);

    const invalidMoveResponse = await axios.post(`${backendUrl}/matches/invalid-move`, {
      match_id, 
      auth0_id, 
      origin_x : rank,
      origin_y : tile,
      destiny_x : x,
      destiny_y : y,
      candidate_moves : appState.candidateMoves
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

    console.log(invalidMoveResponse);

    if (invalidMoveResponse.status === 200){
      isInvalidMove = invalidMoveResponse.data.result
      console.log('Estado de movimiento invalido', isInvalidMove);
    }else{
      return;
    }

    if (isInvalidMove){
      console.log('Movimiento inválido:');
      e.target.style.display = '';
      dispatch(ClearCandidateMoves());
      return;
    }

    console.log('Jugada valida. Aceptando solicitud...');

    //Chequeamos si ocurrió En-Passant
    const enPassant = await EnPassant(piece, newPositions, rank, x, y, match_id, token);

    //actualizar tablero
    //await BoardUpdate(piece, positions, newPositions, rank, tile, x, y, dispatch, appState, match_id, auth0_id, token);
    await BoardUpdate(rank, tile, x, y, dispatch, match_id, auth0_id, enPassant, token);

    //sacamos los circulos de los candidatos
    dispatch(ClearCandidateMoves());
    
    //actualizamos el estado [ongoing, promotion, check, stailmate, b o w(el ganador)]
    //await StatusUpdate(positions, newPositions, piece, x, y, dispatch, castleDirection[turn], auth0_id, match_id);
    await StatusUpdate(x, y, dispatch, auth0_id, match_id, token);

  };

  const onDragOver = (e) => e.preventDefault();

  
  return (
    <div ref={ref} className="pieces" onDragOver={onDragOver}>
      {positions.map((row, rank) =>
        row.map((piece, tile) =>
          positions[rank][tile] != '' ? (
            <div
              key={`${piece} ${rank}-${tile}`}
              className={`piece ${piece} square-${rank}${tile}`}
              draggable={true}
              onDragStart={(e) => onDragStart(e, piece, rank, tile)}
              onDragEnd={(e) => onDragEnd(e, piece, rank, tile)}
            />
          ) : null
        )
      )}
    </div>
  );
}

export default Pieces;
