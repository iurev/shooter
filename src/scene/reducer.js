import Map from '../map.json'
import { Point } from 'paper'
import randomColor from '../utils/random_color'

const SPEED = 10;
const A_KEY = 65;
const D_KEY = 68;
const S_KEY = 83;
const W_KEY = 87;

var shouldUpdateBullets = false

const initialState = {
  scenePosition: {
    x: 0,
    y: 0
  },
  heroPosition: {
    x: 800,
    y: 800
  },
  bullets: []
}

var bulletCounter = 0;

const frame = (state) => {
  if(!shouldUpdateBullets) { return state }
  var newBullets = state.bullets.slice();
  var timeNow = Date.now()
  newBullets.forEach(function(bullet) {
    if(!bullet.updated) {
      if((timeNow - bullet.createdAt) > 10) {
        bullet.x = bullet.targetX;
        bullet.y = bullet.targetY;
        bullet.updated = true;
      }
    }
  })
  newBullets = newBullets.filter(function (bullet) {
    return ((timeNow - bullet.createdAt) < 1000);
  })
  if(!newBullets.length) {
    shouldUpdateBullets = false
  }
  return {
    scenePosition: state.scenePosition,
    heroPosition: state.heroPosition,
    bullets: newBullets
  }
}

const addBullet = (state, e) => {
  var newBullets = state.bullets.slice();
  var targetX = e.clientX - state.scenePosition.x;
  var targetY = e.clientY - state.scenePosition.y;
  var xPoint = targetX - state.heroPosition.x;
  var yPoint = targetY - state.heroPosition.y;
  var point = new Point(xPoint, yPoint);
  point.length = 1000;
  targetX = point.x + state.heroPosition.x;
  targetY = point.y + state.heroPosition.y;
  newBullets.push({
    x: state.heroPosition.x,
    y: state.heroPosition.y,
    targetX,
    targetY,
    id: bulletCounter++,
    createdAt: Date.now(),
    updated: false,
    fill: randomColor(211,59,77, 50)
  })
  shouldUpdateBullets = true;
  return {
    scenePosition: state.scenePosition,
    heroPosition: state.heroPosition,
    bullets: newBullets
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
    heroPosition: {x: heroX, y: heroY},
    bullets: state.bullets
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'KEYPRESS':
      return move(state, action.keyCode)
      break;
    case 'ONCLICK':
      return addBullet(state, action.e)
    case 'FRAME':
      return frame(state);
    default:
      return state;
  }
}

export default reducer
