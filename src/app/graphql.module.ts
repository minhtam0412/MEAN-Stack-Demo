import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, APOLLO_NAMED_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {environment} from "../environments/environment";

const defaultOption: DefaultOptions = {
  query: {
    fetchPolicy: 'network-only'
  },
  watchQuery: {
    fetchPolicy: 'network-only'
  }
}

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri: environment.MONGO_GRAPHQL_API_URL}),
    cache: new InMemoryCache(),
    defaultOptions: defaultOption
  };
}

export function createNamedApollo(httpLink: HttpLink): Record<string, ApolloClientOptions<any>> {
  return {
    postgres: {
      name: "Postgres GraphQL Endpoint",
      link: httpLink.create({uri: environment.POSTGRES_GRAPHQL_API_URL}),
      cache: new InMemoryCache(),
      defaultOptions: defaultOption
    },
    //etc endpoints
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createNamedApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
