import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.GRAPHQL_HOST || 'https://graphql.datocms.com/';

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHQL_TOKEN || 'dummy-token'}`,
  },
});

export default client;
