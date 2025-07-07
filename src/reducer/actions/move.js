export const MakeNewMove = ({newPositions, newMove})=>{
  return {
    type: "NEW_MOVE",
    payload:{newPositions, newMove}
  }
}

export const GenerateCandidateMoves = ({candidateMoves})=>{
  return {
    type: "GENERATE_CANDIDATE_MOVES",
    payload:{candidateMoves}
  }
}

export const ClearCandidateMoves = ()=>{
  return {
    type: "CLEAR_CANDIDATE_MOVES",
  }
}

export const ChangeStatus = (status) => {
  return {
    type: "STATUS_CHANGE",
    payload:{status:status}
  }
}

export const ChangePromotionSquare = (x, y) =>{
  return {
    type: "PROMOTION_SQUARE_CHANGE",
    payload:{square: [x, y]}
  }
}

export const UpdatePositionsOnly = ({newPositions}) => {
  return {
    type: "NEW_POSITION",
    payload:{newPositions}
  }
}

export const UpdateCastlingDirection = (direction) => {
  return {
    type: "NEW_CLASTING_DIRECTION",
    payload: direction
  }
}

export default MakeNewMove;