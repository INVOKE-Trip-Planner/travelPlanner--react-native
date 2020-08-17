import React from 'react';
import Navigator from "navigation";

import {View} from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";


import configureStore from "./store/configureStore"; // for REACT NATIVE**
const {persistor, store} = configureStore();


class App extends React.Component{
 
 

  
  render(){
    return(
  
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{flex:1}}>
            <Navigator/>  
          </View>
       </PersistGate>
      </Provider>
    
      
    )
  }
  
  }
  
  
  
  
  export default App;

