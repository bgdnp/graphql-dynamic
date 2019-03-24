const Type = require('./Type')

class Int extends Type {
  validate(value) {
    if (Number.isSafeInteger(value) || value === null) {
      return true
    }

    throw Error(`Default value must be of type integer, ${typeof value} given.`)
  }
}

module.exports = Int