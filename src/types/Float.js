const Type = require('./Type')

class Float extends Type {
  validate(value) {
    if (typeof value === 'number' || value === null) {
      return true
    }

    throw Error(`Default value must be of type number, ${typeof value} given.`)
  }
}

module.exports = Float