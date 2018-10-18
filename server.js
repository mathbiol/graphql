// https://graphql.org/code/

var http = require('http');
var { graphql, buildSchema } = require('graphql');
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

http.createServer(function (request, response) {
    graphql(schema, '{ hello }', root)
      .then((res) => {
        console.log(response,res);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(`Hello at ${Date()} returned\n ${JSON.stringify(res,null,3)}`);
    });      
}).listen(4000);

console.log('Server started');



/*

/// WITH EXPRESS ///

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    let r = 'Hello Earth'
    return r 
  },
};

var app = express();
// CORS
app.use(cors());

// graphql middle layer
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
*/