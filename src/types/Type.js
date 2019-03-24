class Type {
  constructor(required = true, value = null) {
    this.validate(value)
    this.required = required
    this.default = value
  }

  type() {
    let req = this.required ? '!' : ''
    let def = this.default ? ` = "${this.default}"` : ''
    return this.constructor.name + req + def
  }

  static type() {
    const self = new this()
    return self.type()
  }

  static set(params) {
    let req = params.required !== undefined ? params.required : true
    let def = params.default || null
    return new this(req, def)
  }

  validate(value) {
    return true
  }

  static validate(value) {
    const self = new this()
    return self.validate(value)
  }
}

module.exports = Type