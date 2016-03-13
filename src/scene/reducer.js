const SPEED = 30;
const A_KEY = 65;
const D_KEY = 68;
const S_KEY = 83;
const W_KEY = 87;

const initialState = {
  x: 0,
  y: 0
}

const move = (position, keyCode) => {
  var x = position.x;
  var y = position.y;
  switch (keyCode) {
    case A_KEY:
      x += SPEED;
      break;
    case D_KEY:
      x -= SPEED;
      break;
    case W_KEY:
      y += SPEED;
      break;
    case S_KEY:
      y -= SPEED;
      break;
  }(keyCode)
  return {x, y};
};

const reducerKeyPress = (state = initialState, action) => {
  switch (action.type) {
    case 'KEYPRESS':
      return move(state, action.keyCode)
      break;
    default:
      return state;
  }
}

export default reducerKeyPress
