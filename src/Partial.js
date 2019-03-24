const Partial = new Proxy({}, {
  get(_, name) {
    if (name.indexOf('on') === 0) {
      return (fields) => {
        return {
          name: '... on ' + name.slice(2),
          fields
        }
      }
    }
    return (fields) => ({
      name,
      fields
    })
  }
})

module.exports = Partial