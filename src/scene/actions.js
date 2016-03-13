export const keyPressAction = (keyCode) => {
  return {
    type: 'KEYPRESS',
    keyCode: keyCode
  }
}

export const onClickAction = (e) => {
  console.log(e);
  return {
    type: 'ONCLICK',
    e: e
  }
}
