export const reducer = (state, action) => {
  switch (action.type){
    case "NEW_MOVE":

      let turn = state

      turn = state.turn === 'w'? 'b' : 'w';

      return {
        ...state,
        positions: [...state.positions, action.payload.newPositions],
        turn,
        movesList : [...state.movesList, action.payload.newMove]
      }

    case "GENERATE_CANDIDATE_MOVES":
      return {
        ...state,
        candidateMoves : action.payload.candidateMoves,
      }

    case "CLEAR_CANDIDATE_MOVES":
      return {
        ...state,
        candidateMoves : [],
      }
    
    case "STATUS_CHANGE":
      return {
        ...state,
        status : action.payload.status,
      }

    case "PROMOTION_SQUARE_CHANGE":
      return {
        ...state,
        promotionSquare: action.payload.square,
      }

    case "NEW_POSITION":
      return {
        ...state,
        positions: [...state.positions, action.payload.newPositions],
      }
    
    case "NEW_CLASTING_DIRECTION":
      let {castlingDirection} = state;
      let nowTurn = state.turn;
      
      castlingDirection[nowTurn] = action.payload
      return {
        ...state,
        castlingDirection
      }
      
    default:
      return state
  }

}

export default reducer;