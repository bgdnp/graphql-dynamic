const Type = require('./Type')

class ID extends Type {
  validate(value) {
    if (this.isScalar(value) || value === null) {
      return true
    }

    throw Error(`Default value must be scalar type (string or number), ${typeof value} given.`)
  }

  isScalar(value) {
    return (/number|string/).test(typeof value)
  }
}

module.exports = ID