class InputBuilder {
  constructor(fields) {
    this.required = []

    Object.keys(fields).map(key => {
      if (typeof fields[key] === 'function' || fields[key].required) {
        this.required.push(key)
      }

      this[key] = fields[key]
    })
  }

  build(fields) {
    let input = {}
    let required = []
    Object.keys(fields).map(key => {
      if (typeof this[key] === 'undefined') {
        throw Error(`Unknown input field ${key}.`)
      }

      if (this.required.indexOf(key) !== -1) {
        required.push(key)
      }

      if (this[key].validate(fields[key])) {
        input[key] = fields[key]
      }
    })

    if (this.required.length === required.length) {
      return input
    }

    throw Error('Input is missing some required fields.')
  }
}

const Input = new Proxy({}, {
  get() {
    return (fields) => new InputBuilder(fields)
  }
})

module.exports = Input