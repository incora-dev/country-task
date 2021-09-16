import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

import { Countries } from './modules/countries/pages/countries/Countries';

import '@elastic/eui/dist/eui_theme_light.css';
import './App.css';


const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Countries />
    </ApolloProvider>
  );
}

export default App;
