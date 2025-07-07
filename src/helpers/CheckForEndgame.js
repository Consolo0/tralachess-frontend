import GetMoves from './GetMoves';
import IsKingSafe from './IsKingSafe';

function checkForEndgame(prevPositions, positions, color, castleDirection) {
  let x_king, y_king;
  let allEnemyMoves = [];

  // 1. Identificar al rey y los movimientos enemigos
  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions[i].length; j++) {
      const piece = positions[i][j];
      if (!piece) continue;

      if (piece[0] === color && piece[1] === 'k') {
        [x_king, y_king] = [i, j];
      } else if (piece[0] !== color) {
        const moves = GetMoves(piece, i, j, positions, prevPositions, castleDirection);
        allEnemyMoves.push(...moves);
      }
    }
  }

  //2. Chequear si esta en check

  const isInCheck = allEnemyMoves.some(
    ([x, y]) => x === x_king && y === y_king
  );

  // Buscar si alguna pieza amiga puede defender al rey
  let hasValidDefensiveMove = false;

  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < positions[i].length; j++) {
      const piece = positions[i][j];

      if (!piece || piece[0] !== color) continue;

      const candidateMoves = GetMoves(piece, i, j, positions, prevPositions);

      for (const [x, y] of candidateMoves) {
        if (IsKingSafe(prevPositions, positions, piece, i, j, x, y, castleDirection)) {
          hasValidDefensiveMove = true;
          break;
        }
      }

      if (hasValidDefensiveMove) break;
    }
  }

  if (isInCheck && hasValidDefensiveMove){
    //check
    return 'check';
  }

  if (isInCheck && !hasValidDefensiveMove) {
    // Jaque mate
    return color === 'w' ? 'b' : 'w';
  } else if (!isInCheck && !hasValidDefensiveMove) {
    // Tablas por ahogado
    return 'draw';
  }

  return '';
}

export default checkForEndgame;
