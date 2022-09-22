const piece0 = [ [0, 0, 0, 0],
                 [1, 1, 1, 1],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0] ];

const piece1 = [ [1, 1],
                 [1, 1] ];

const piece2 = [ [0, 1, 0],
                 [1, 1, 1],
                 [0, 0, 0] ];

const piece3 = [ [1, 0, 0],
                 [1, 1, 1],
                 [0, 0, 0] ];

const piece4 = [ [0, 0, 1],
                 [1, 1, 1],
                 [0, 0, 0] ];

const piece5 = [ [0, 1, 1],
                 [1, 1, 0],
                 [0, 0, 0] ];

const piece6 = [ [1, 1, 0],
                 [0, 1, 1],
                 [0, 0, 0] ];

const pieces = [ piece0,
                 piece1,
                 piece2,
                 piece3,
                 piece4,
                 piece5,
                 piece6 ];

const numPieces = pieces.length;

export { pieces, numPieces };

//don't like this
const start0 = {row:-1, column:3};
const start1 = {row:0, column:4};
const start2 = {row:0, column:3};
const start3 = {row:0, column:3};
const start4 = {row:0, column:3};
const start5 = {row:0, column:3};
const start6 = {row:0, column:3};
const starts = [ start0,
                 start1,
                 start2,
                 start3,
                 start4,
                 start5,
                 start6 ];

export { starts };
