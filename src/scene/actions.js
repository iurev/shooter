export const keyPressAction = (keyCode) => {
  return {
    type: 'KEYPRESS',
    keyCode: keyCode
  }
}

export const onClickAction = (e) => {
  return {
    type: 'ONCLICK',
    e: e
  }
}

export const frameAction = () => {
  return {
    type: 'FRAME'
  }
}
