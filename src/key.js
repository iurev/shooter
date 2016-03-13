const Key = {
  _pressed: [],

  pressed: function () {
    return this._pressed;
  },

  onKeydown: function(event) {
    if(this._pressed.indexOf(event.keyCode) === -1) {
      this._pressed.push(event.keyCode)
    }
  },

  onKeyup: function(event) {
    var index = this._pressed.indexOf(event.keyCode)
    if(index !== -1) {
      this._pressed.splice(index, 1)
    }
  }
};

window.wwjuKey = Key

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

export default Key
