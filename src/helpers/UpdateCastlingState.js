import { UpdateCastlingDirection } from "../reducer/actions/move";

export const UpdateCastlingState = ({piece, rank, tile, appState, dispatch}) => {
  const direction = getClastingDirections({
    castlingDirection : appState.castlingDirection,
    piece,rank,tile,
  })

  if (direction){
    dispatch(UpdateCastlingDirection(direction));
  }
}

const getClastingDirections = ({castlingDirection, piece,rank,tile}) => {
  const direction = castlingDirection[piece[0]];

  if (piece[1] === "k"){
    return 'none';
  }

  if (tile === 0 && rank === 7){
    if (direction === 'both'){
      return 'right';
    }
    else if (direction === 'left'){
      return 'none'
    }
  }

  if (tile === 7 && rank === 7){
    if (direction === 'both'){
      return 'left';
    }
    else if (direction === 'right'){
      return 'none'
    }
  }

  if (tile === 0 && rank === 0){
    if (direction === 'both'){
      return 'right';
    }
    else if (direction === 'left'){
      return 'none'
    }
  }

  if (tile === 7 && rank === 0){
    if (direction === 'both'){
      return 'left';
    }
    else if (direction === 'right'){
      return 'none'
    }
  }
}
export default UpdateCastlingState;