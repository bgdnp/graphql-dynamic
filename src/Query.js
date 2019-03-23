const gql = require('graphql-tag')

class QueryBuilder {
  constructor(query, params = {}) {
    this.variables = []
    this.params = []
    Object.keys(params).map(key => {
      this.variables.push(`$${key}: ${params[key].type()}`)
      this.params.push(`${key}: $${key}`)
    })
    this.query = query
  }

  body(fields) {
    const body = this.parse(fields)
    if (this.variables.length) {
      this.query = `query(${this.variables.join(', ')}) { ${this.query}(${this.params.join(', ')}) ${body} }`
    } else {
      this.query = `query { ${this.query} ${body} }`
    }
    return gql`${this.query}`
  }

  parse(fields) {
    let f = [];
    fields.map(field => {
      if (typeof field === 'object') {
        f.push(field.name + ' ' + this.parse(field.fields))
      } else {
        f.push(field)
      }
    })

    return `{ ${f.join(' ')} }`
  }
}

const Query = new Proxy({}, {
  get(_, query) {
    return (params) => {
      return new QueryBuilder(query, params)
    }
  }
})

module.exports = Query