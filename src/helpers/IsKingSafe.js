import GetMoves from "./GetMoves";

function IsKingSafe(prevPositions, positions, piece, rank, tile, x, y, castleDirection){
  //1.
  positions = positions.map(row=>[...row]);
  positions[rank][tile] = '';
  positions[x][y] = piece;

  let x_king, y_king;

  //2.
  const enemy = piece[0] === 'w' ? 'b':'w';
  let allEnemyMoves = [];

  for (let i=0; i<positions.length;i++){
    for (let j=0; j<positions[i].length;j++){

      if (positions[i][j][0] === enemy){
        const movesByPiece = GetMoves(positions[i][j], i, j, positions, prevPositions, castleDirection);
        allEnemyMoves = [...allEnemyMoves, ...movesByPiece];
      }

      else if (positions[i][j][1] === `k`){
        [x_king, y_king] = [i, j];
      }

    }
  }

  const isInCheck = allEnemyMoves.some(([x, y]) => x===x_king && y=== y_king);

  //3.
  return !isInCheck;

}

export default IsKingSafe;