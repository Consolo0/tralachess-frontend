import axios from "axios";
import { ChangePromotionSquare, ChangeStatus } from "../reducer/actions/move";
import checkForEndgame from "./CheckForEndgame";

export const StatusUpdate = async (x, y,dispatch, auth0_id, match_id, token) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let newStatus;
  const newStatusResponse = await axios.patch(`${backendUrl}/matches/update-status`, {
    match_id,
    auth0_id,
    destiny_x : x,
    destiny_y : y,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(newStatusResponse);
  if (newStatusResponse.status === 200){
    newStatus = newStatusResponse.data.result;
    console.log('new status',newStatus);
  }else{
    return;
  }
  
  /*const opponentColor = piece[0] === 'w' ? 'b' : 'w';
  const matchResult = checkForEndgame(positions, newPositions, opponentColor, castleDirection);

  if (piece.endsWith('p') && ((piece[0] === "w" && x === 0) || (piece[0] === "b" && x === 7))){
    dispatch(ChangeStatus("promotion"));
    dispatch(ChangePromotionSquare(x, y));
  }
  else if ('' !== matchResult){
    dispatch(ChangeStatus(matchResult));
  }
  else{
    dispatch(ChangeStatus("ongoing"));
  }*/

  dispatch(ChangeStatus(newStatus));
  if (newStatus === "promotion"){
    const newPromotionBoxResponse = await axios.patch(`${backendUrl}/matches/set-promotion-box`, {
      match_id,
      auth0_id,
      x,
      y,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(newPromotionBoxResponse);
    if (newPromotionBoxResponse.status === 200){
      dispatch(ChangePromotionSquare(x, y));
    }else{
      console.error('setear promotion box a fallado');
      return;
    }
  }
}

export default StatusUpdate;