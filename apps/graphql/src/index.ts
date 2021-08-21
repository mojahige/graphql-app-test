import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { UserAPI } from './dataSources/user';

const typeDefs = fs
  .readFileSync(path.join(__dirname, '../schemata/schema.graphql'))
  .toString();

function dataSources() {
  return {
    userAPI: new UserAPI(),
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, dataSources, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
