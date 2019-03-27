## Introduction

Even if in most cases it is recommended to have static queries predefined, in some situations, like when query structure depends on a data received from another service it is useful to have logic for creating queries on the fly. This package intends to provide this logic in simplest way possible.

## Notice

Package is still growing, some features are missing, like defining inputs, fragments, mutations and subscriptions, but all of these features will be added soon.

## Instalation
```
npm install --save graphql-dynamic-queries
```

## Usage
#### Basic query
Load `Query` from the package and call a method which is your query name (even if the method does not exist, query builder is functioning behind a proxy instance which will resolve method name as a query name). In the `body` method pass an array of fields you want to fetch. See example bellow: 
```js
const { Query } = require('graphql-dynamic-queries')

const myQuery = Query.getUsers().body([
  'name',
  'email',
  'created_at'
])

// Then execute the query howerver you prefer
// Using ApolloProvider, for example
```
This will generate the query like this:
```
query {
  getUsers {
    name
    email
    created_at
  }
}
```
#### Nested objects query
For nested query structure, you can pass an object instead of strings. Object should have properties `name` which is the root of subset and `fields` which is the array of fields in a subset.
```js
const getPosts = Query.getPosts().body([
  'title',
  'content',
  {
    name: 'author',
    fields: ['name', 'email']
  }
])
```
Result of this is schema:
```
query {
  getPosts {
    title
    content
    author {
      name
      email
    }
  }
}
```
However, for readability purpose, instead of passing object literals this package introduces `Partial` which creates a subset. Method called on a `artial is the root of the subset and array of fields are passed to the method. Example above can be written using partials like this:
```js
const { Query, Partial } = require('graphql-dynamic-queries')

const author = Partial.author(['name', 'email'])

const getPosts = Query.getPosts().body([
  'title',
  'content',
  author
])
```
Partials, like objects, can be nested in each other:
```js
const getPosts = Query.getPosts().body([
  'title',
  'content',
  Partial.author([
    'name',
    'email',
    Partial.address([
      'city',
      'street'
    ])
  ])
])
```
Resulting query will be
```
query {
  getPosts {
    title
    content
    author {
      name
      email
      address {
        city
        street
      }
    }
  }
}
```
#### Declaring query variables
Defining query parameters can be done passing an object to query method. Object keys are the names of parameters and values are type classes provided by the package. See example with query parameter bellow:
```js
const { Query, String } = require('graphql-dynamic-queries')

const postQuery = Query.getPostBySlug({
  slug: String
}).body([
  'title',
  'content'
])
```
Resulting query will look like this
```
query($slug: String!) {
  getPostBySlug(slug: $slug) {
    title
    content
  }
}
```
Variables are required by default, and without default value. This can be configured using set static method on type class:
```js
const { Query, String } = require('graphql-dynamic-queries')

const postQuery = Query.getPostBySlug({
  slug: String.set({
    required: false,
    default: 'some-slug'
  })
}).body([
  'title',
  'content'
])
```
Result:
```
query($slug: String = "some-slug") {
  getPostBySlug(slug: $slug) {
    title
    content
  }
}
```
Typing classes for `Int`, `Float`, `Boolean` and `ID` are also included.
#### Type specific partial
For specifing type specific part of the query. For example like this one:
```
query($id: String!) {
  getComponent(id: $id) {
    name
    slug
    ... on Menu {
      title
      items {
        title
        url
      }
    }
  }
}
```
You can create partial with method prefixed with `on` and followed by type name. Query above can be created with:
```js
Query.getComponent({
  id: String
}).body([
  'name',
  'slug',
  Partial.onMenu([
    'title',
    Partial.items(['title', 'url'])
  ])
])
```
