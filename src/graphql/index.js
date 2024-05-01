// 'use client'
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { relayStylePagination } from '@apollo/client/utilities';
import Cookies from 'js-cookie';



const authLink = setContext((_, { headers }) => {
    let token;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        const storedToken = Cookies.get('token');
        token = storedToken != null ? storedToken : '';
    }

    return {
        headers: {
            ...headers,
            Authorization: token ? `JWT ${token}` : '',
        },
    };
});

const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
        // Graphql Error handling
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, extensions, locations, path }) => {
                if (
                    message === "Signature has expired" ||
                    message === "You are not authorized user." ||
                    message === "Unauthorized user!"
                ) {
                    Cookies.remove("token");
                    Cookies.remove("role");
                    window.location.href = "/"
                }
            });
        }

        // If network error happening
        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    }
);



const httpLink = from([errorLink, new HttpLink({
    uri: process.env.NEXT_PUBLIC_URL,
})]);

const options = {
    typePolicies: {
        Query: {
            fields: {
                recruiterPosts: relayStylePagination(),
                candidateList: relayStylePagination(),
            },
        },
    },
};

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(options),
});
