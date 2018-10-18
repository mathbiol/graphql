// https://graphql.org/code/

var http = require('http');
var port = process.env.PORT || 4000
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
        //console.log(response,res);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(`querying for { hello } returned\n${JSON.stringify(res,null,3)}`);
    });      
}).listen(port);

console.log(`listening to ${port} at ${Date()}`);
