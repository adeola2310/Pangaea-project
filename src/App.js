import './App.css';
import React, {useReducer} from "react";
import Products from "./pages/products/products";
import { omit} from 'lodash'
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
});

const initalState = {}

function reducer(state, action) {
    switch (action.type) {
        case 'Add':
            if (action.payload.id in state)
                return {
                    ...state,
                    [action.payload.id]: {
                        ...state[action.payload.id],
                        quantity: state[action.payload.id].quantity + 1,
                    },
                };

            return {
                ...state,
                [action.payload.id]: {
                    product: action.payload,
                    quantity: 1,
                },
            };
        case 'QuantityChange':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    quantity: action.quantity,
                },
            };
        case 'Delete':
            return omit(state, [action.id]);
        default:
            throw new Error();
    }
}


function App() {
    const [cartList, setCartList] = useReducer(reducer, initalState);

    return (
      <ApolloProvider client={client}>
          <Products cartList={cartList} setCartList={setCartList}/>

      </ApolloProvider>

  );
}

export default App;
