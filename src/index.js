import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk";
import { ChakraProvider } from "@chakra-ui/react"

 import reducers from "./reducers"

 import App from "./App";

 const store = createStore(reducers, compose(applyMiddleware(thunk)));

  ReactDOM.render(
    <ChakraProvider>
  <Provider store={store}>
      <App/>
  </Provider> 
    </ChakraProvider> , document.getElementById('root'));