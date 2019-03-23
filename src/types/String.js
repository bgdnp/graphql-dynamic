const Type = require('./Type')

class String extends Type {
  validate(value) {
    if (typeof value === 'string') {
      return true
    }

    throw Error(`Default value must be of type string, ${typeof value} given.`)
  }
}

module.exports = String