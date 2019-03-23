const Partial = new Proxy({}, {
  get(_, name) {
    return (fields) => {
      return {
        name,
        fields
      }
    }
  }
})

module.exports = Partial