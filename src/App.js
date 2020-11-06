import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React from "react";
import Products from "./pages/products/products";
import {ApolloClient} from 'apollo-boost';
import { InMemoryCache} from "apollo-cache-inmemory";
import {createHttpLink} from "apollo-link-http";
import { ApolloProvider} from 'react-apollo'


const httpLink = createHttpLink({
uri: "https://pangaea-interviews.now.sh/api/graphql"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
link: httpLink,
    cache
})

function App() {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <Switch>
                  <Route path="/" exact  component={Products}/>
              </Switch>
          </BrowserRouter>
      </ApolloProvider>

  );
}

export default App;
