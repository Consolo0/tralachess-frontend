export const IsNotPlayerTurn = (appState, piece) => {
  return (appState.turn !== piece[0] || appState.color_assigned !== piece[0]);
}

export default IsNotPlayerTurn;