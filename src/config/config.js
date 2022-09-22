

const fallTimeIntervals = [500, 450, 400, 300, 250, 200]

const numLevels = fallTimeIntervals.length;

export function getFallTimeInterval(level){
  return fallTimeIntervals[level];
}



export const cellSize = 30;

export const boardDimensions = {
  numRows: 20,
  numColumns: 10,
}

export const nextPieceDimensions = {
  numRows: 4,
  numColumns: 6,
}
