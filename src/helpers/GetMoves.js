import GetClastlingMoves from "./GetCastlingMoves";

export const GetMoves = (piece, rank, tile, positions, prevPositions, castleDirection) => {
  let moves = [];
  const directions = GetDirectionsByPiece(piece);
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  if (piece[1] !== "p") {
    for (const dir of directions.moves) {
      for (let i = 1; i < directions.limit; i++) {
        const x = rank + dir[0] * i;
        const y = tile + dir[1] * i;

        if (x < 0 || x > 7 || y < 0 || y > 7) break;

        const target = positions[x][y];

        if (target === "") {
          moves.push([x, y]);
        } 
        else if (target[0] === enemy) {
          moves.push([x, y]);
          break;
        } 
        else {
          break;
        }
      }
    }
    //chequear castling
    if (piece[1] === 'k' && castleDirection){
      moves = [
        ...moves,
        ...GetClastlingMoves(positions, castleDirection, piece, rank, tile)
      ]
    }

  } else {

    // Peón
    const direction = us === "w" ? -1 : 1;
    const startRank = us === "w" ? 6 : 1;

    // Movimiento "por defecto"
    for (let i = 1; i < directions.limit; i++){

      for (const dir of directions.DuringMatch) {
        const x = rank + dir[0]*i*direction;
        const y = tile + dir[1]*i*direction;

        if (x < 0 || x > 7 || y < 0 || y > 7) break;

        else if (positions[x][y] === "") {
          moves.push([x, y]);
        }

        else{
          break;
        }
      }
    }

    // Capturas diagonales (solo una casilla adelante)
    for (const dir of directions.EnemiesNear) {
      const x = rank + dir[0] * direction;
      const y = tile + dir[1];

      if (x < 0 || x > 7 || y < 0 || y > 7) continue;

      if (positions[x][y] !== "" && positions[x][y][0] === enemy) {
        moves.push([x, y]);
      }
    }

    // Movimiento doble al inicio (controlando obstáculos intermedios)
    if (rank === startRank && directions.limit >= 2) {
      const x1 = rank + direction;
      const x2 = rank + 2 * direction;
      const y = tile;
      if (
        x2 >= 0 && x2 <= 7 &&
        positions[x1][y] === "" &&
        positions[x2][y] === ""
      ) {
        moves.push([x2, y]);
      }
    }

    //En-passant
    const adjacentTiles = [tile-1, tile+1];

    for (const adjacentTile of adjacentTiles){
      if (prevPositions){
        if((us === "w" && rank === 3) || (us === "b" && rank === 4)){
          if (
            positions?.[rank]?.[adjacentTile] === `${enemy}p` &&
            positions?.[rank+(2*direction)]?.[adjacentTile] === `` && 
            prevPositions?.[rank+(2*direction)]?.[adjacentTile] === `${enemy}p` &&
            prevPositions?.[rank]?.[adjacentTile] === ``
          ){
            moves.push([rank+direction, adjacentTile]);
          }

        }
      }
    }
  }

  return moves;
};


const GetDirectionsByPiece = (piece) => {
  //aca aplciariamos la logica de obtener los movimientos permitidos mediante el id, los cuales pueden ser obtenidos mediante la posición
  //ya que cada posición es únicamente ocupada por una pieza en cada partida

  switch (piece[1]){
    case "b": // Bishop
    return {
      moves: [[1, 1], [-1, -1], [-1, 1], [1, -1]],
      limit: 8,
    };

  case "r": // Rook
    return {
      moves: [[1, 0], [-1, 0], [0, 1], [0, -1]],
      limit: 8,
    };

  case "q": // Queen
    return {
      moves: [[1, 1], [-1, -1], [-1, 1], [1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]],
      limit: 8,
    };

  case "k": // King
    return {
      moves: [[1, 1], [-1, -1], [-1, 1], [1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]],
      limit: 2,
    };

  case "n": // Knight
    return {
      moves: [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]],
      limit: 2,
    };

  case "p":

    return {
      OnStart: [[2, 0]],
      DuringMatch: [[1, 0]],
      EnemiesNear: [[1, 1], [1, -1]],
      limit: 2,
    }

  default:
    return {
      moves: [],
      limit: 0,
    };
  }
}

export default GetMoves;