// https://graphql.org/code/

const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Date {
    now: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    date: [Date]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    date: () => [{now:Date()}],
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/*
var http = require('http');
var port = process.env.PORT || 4000
var { graphql, buildSchema } = require('graphql');
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => `Hello World at ${Date()} !` };

http.createServer(function (request, response) {
  if (request.url != '/favicon.ico') {
    graphql(schema, '{ hello }', root)
      .then((res) => {
        //console.log(response,res);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(`querying for { hello } returned\n${JSON.stringify(res,null,3)}\nsource code at https://www.github.com/mathbiol/graphql`);
    });
  }else{
    response.end(''); //<-- favicon being requested
  }
          
}).listen(port);

console.log(`listening to ${port} at ${Date()}`);
*/