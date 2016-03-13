import Map from '../map.json'

const SPEED = 30;
const A_KEY = 65;
const D_KEY = 68;
const S_KEY = 83;
const W_KEY = 87;

const initialState = {
  scenePosition: {
    x: 0,
    y: 0
  },
  heroPosition: {
    x: 800,
    y: 800
  }
}

const move = (state, keyCode) => {
  var sceneX = state.scenePosition.x;
  var sceneY = state.scenePosition.y;
  var heroX = state.heroPosition.x;
  var heroY = state.heroPosition.y;

  switch (keyCode) {
    case A_KEY:
      heroX -= SPEED;
      sceneX += SPEED;
      break;
    case D_KEY:
      heroX += SPEED;
      sceneX -= SPEED;
      break;
    case W_KEY:
      heroY -= SPEED;
      sceneY += SPEED;
      break;
    case S_KEY:
      heroY += SPEED;
      sceneY -= SPEED;
      break;
  }(keyCode)

  var xIndex = Math.floor(heroX / 100);
  var yIndex = Math.floor(heroY / 100);

  if(Map[xIndex][yIndex].cellType === 'water') { return state }

  return {
    scenePosition: {x: sceneX, y: sceneY},
    heroPosition: {x: heroX, y: heroY}
  };
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
