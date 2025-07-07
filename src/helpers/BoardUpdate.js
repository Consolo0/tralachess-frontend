import axios from "axios";
import MakeNewMove from "../reducer/actions/move";

//lo obtendriamos del backend, retorno newPositions y newMove
export const BoardUpdate = async (rank, tile, x, y, dispatch, match_id, auth0_id, enPassant, token) => {

  //const newMove = GenerateMoveNotation(positions, piece, rank, tile, x, y);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let newMove;
  const newMoveResponse = await axios.patch(`${backendUrl}/matches/update-moves-list`, {
    matchId : match_id,
    origin_x : rank,
    origin_y : tile,
    destiny_x : x,
    destiny_y : y,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(newMoveResponse);
  if (newMoveResponse.status === 200){
    newMove = newMoveResponse.data.result;
    console.log('new move',newMove);
  }else{
    return;
  }

  let newPositions;
  const newPositionResponse = await axios.patch(`${backendUrl}/matches/update-board`, {
    auth0_id: auth0_id,
    matchId : match_id,
    origin_x : rank,
    origin_y : tile,
    destiny_x : x,
    destiny_y : y,
    en_passant : enPassant,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(newPositionResponse);

  if (newPositionResponse.status === 200){
    newPositions = newPositionResponse.data.result
    console.log('new position', newPositions);
  }else{
    return;
  }
  //perform castling
  /*if (piece[1] === 'k' && Math.abs(tile-y) >= 2){
    if (y===2){
      newPositions[x][3] = newPositions[x][0];
      newPositions[x][0] = '';
    }

    else if (y === 6){
      newPositions[x][5] = newPositions[x][7];
      newPositions[x][7] = '';
    }
  }

  //update castling status
  if (piece[1] === "k" || piece[1] === "r"){
    UpdateCastlingState({piece, rank, tile, appState, dispatch});
  }

  newPositions[rank][tile] = '';
  newPositions[x][y] = piece;*/

  //siempre los dispatch son llamados a la api para cambiar algo de la base de datos
  dispatch(MakeNewMove({ newPositions, newMove }));
}