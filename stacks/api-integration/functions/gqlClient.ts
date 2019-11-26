import fetch from "node-fetch";
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloClient, DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { get, map, values } from 'lodash';

const defaultOptions : DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
    },
};

// Create a Apollo Client Context for a given auth token:
const authLink = token =>
    setContext((_, {headers}) => ({
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    }));

// Generate an Apollo Client for a given auth token:
export const generateClient = (gqlEndpoint: string, token: string) => {
    return new ApolloClient({
        link: authLink(token).concat(new HttpLink({uri: gqlEndpoint, fetch})),
        cache: new InMemoryCache(),
        defaultOptions : defaultOptions
    });
}

// Get nodes for a given path from graphQL response:
export const getNodesAt = (results, path) => {
    return map(
        values(get(results, path)),
        x => x.node,
    );
}
