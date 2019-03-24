const Type = require('./Type')

class Boolean extends Type {
  validate(value) {
    if (typeof value === 'boolean' || value === null) {
      return true
    }

    throw Error(`Default value must be of type boolean, ${typeof value} given.`)
  }
}

module.exports = Boolean