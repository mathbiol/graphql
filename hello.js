var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String,
    meaning: Int!
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
  res=response
  console.log(response);
});
