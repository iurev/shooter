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
    x: Math.floor(window.innerWidth/2),
    y: Math.floor(window.innerHeight/2)
  },
  bullets: [],
  monsters: [
    {
      x: 1000,
      y: 1000,
      id: 1
    },
    {
      x: 1200,
      y: 1200,
      id: 2
    },
    {
      x: 1300,
      y: 800,
      id: 3
    }
  ]
}

var bulletCounter = 0;

const updateBullets = (newBullets, state) => {
  var timeNow = Date.now()
  newBullets = newBullets.filter(function (bullet) {
    return ((timeNow - bullet.createdAt) < 1000);
  })
  newBullets.forEach(function (bullet) {
    let vel = nextPoint({
      target: {
        x: bullet.targetX,
        y: bullet.targetY
      },
      current: {
        x: bullet.x,
        y: bullet.y
      }
    }, 150)
    bullet.x += vel.x
    bullet.y += vel.y
  })
  return newBullets;
}

const nextPoint = (obj, speed=SPEED*1.2) => {
  let tx = obj.target.x - obj.current.x
  let ty = obj.target.y - obj.current.y
  let dist = Math.sqrt(tx*tx+ty*ty)
  let velX = (tx/dist)*speed
  let velY = (ty/dist)*speed

  return {
    x: velX,
    y: velY,
    dist: dist
  }
}

const updateMonsters = (newMonsters, state) => {
  // var heroPoint = new Point(state.heroPosition.x, state.heroPosition.y)
  // console.log(newMonsters.length)
  newMonsters.forEach(function (monster) {
    // var monsterPoint = new Point(monster.x, monster.y)
    var x = state.heroPosition.x - monster.x
    var y = state.heroPosition.y - monster.y
    var vector = new Point(x, y)
    var distance = vector.length
    if(distance < 500) {
      let vel = nextPoint({
        target: {
          x: state.heroPosition.x,
          y: state.heroPosition.y
        },
        current: {
          x: monster.x,
          y: monster.y
        }
      })

      if(vel.dist >= 50) {
        monster.x += vel.x
        monster.y += vel.y
      }
    }
  })

  return newMonsters;
}

const frame = (state) => {
  // if(!shouldUpdateBullets) { return state }
  var newBullets = state.bullets.slice();
  var newMonsters = state.monsters.slice();
  newBullets = updateBullets(newBullets, state);
  newMonsters = updateMonsters(newMonsters, state);

  return {
    scenePosition: state.scenePosition,
    heroPosition: state.heroPosition,
    bullets: newBullets,
    monsters: newMonsters
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
    bullets: newBullets,
    monsters: state.monsters
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
    bullets: state.bullets,
    monsters: state.monsters
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
