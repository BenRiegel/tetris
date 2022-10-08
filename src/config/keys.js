//----- module code block ------------------------------------------------------

const gameKeys = {
  MOVE_RIGHT: 39,
  MOVE_LEFT:  37,
  MOVE_DOWN:  40,
  FLIP_LEFT:  90,
  FLIP_RIGHT: 88,
  DROP:       32,
}

const gameKeyCodes = Object.values(gameKeys);


//----- export code block ------------------------------------------------------

export { gameKeys, gameKeyCodes };
