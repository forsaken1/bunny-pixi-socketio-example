var Field = require('./field')

function float_to_int(num) {
  return Math.floor(parseFloat(num))
}

var Map = function() {
  var $map = this

  this.map = [
    ['&', '.', '.', '.',    '$', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '&', '*',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '#', '#', '$',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '.', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],

    ['*', '.', '.', '.',    '&', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '.', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '@', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '.', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],

    ['.', '.', '.', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '.', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '.', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
    ['.', '.', '.', '.',    '.', '.', '.', '.',     '.', '.', '.', '.',     '.', '.', '.', '.'],
  ]
  this.field = []
  this.width = 0
  this.height = 0

  for(var i in $map.map) {
    $map.field[i] = []
    $map.height++
    for(var j in $map.map[i]) {
      $map.field[i][j] = new Field($map.map[i][j])
      i == 0 && $map.width++
    }
  }

  this.get = function(i, j) {
    return $map.field[i][j]
  }

  this.is_collision = function(user) {
    return {
      l: function() {
        return user.x <= 0.5 || ( user.x >= 1 && $map.get( float_to_int(user.y), float_to_int(user.x) - 1 ).is_wall() )
      },
      u: function() {
        return user.y <= 0.5 || ( user.y >= 1 && $map.get( float_to_int(user.y) - 1, float_to_int(user.x) ).is_wall() )
      },
      r: function() {
        return user.x >= $map.width - 0.7 || $map.get( float_to_int(user.y), float_to_int(user.x) + 1 ).is_wall()
      },
      d: function() {
        return user.y >= $map.height - 0.7 || $map.get( float_to_int(user.y) + 1, float_to_int(user.x) ).is_wall()
      }
    }[user.direction]()
  }

  this.get_raw = function() {
    return $map.map
  }
}

module.exports = Map