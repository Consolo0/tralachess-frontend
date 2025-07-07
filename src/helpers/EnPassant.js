import axios from "axios";

export const EnPassant = async (piece, newPositions, rank, x, y, match_id, token) => {
  //ese if lo obtendriamos del backend
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let EnPassantPossibleMove = false;
  const enPassantResponse = await axios.get(`${backendUrl}/matches/en-passant`, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      piece,
      match_id,
      destiny_x : x,
      destiny_y : y,
    }
  });

  console.log(enPassantResponse);

  if (enPassantResponse.status === 200){
    EnPassantPossibleMove = enPassantResponse.data.result;
    console.log('Got En Passant check', EnPassantPossibleMove);
    return EnPassantPossibleMove;
  }else{
    return
  }
}

export default EnPassant;