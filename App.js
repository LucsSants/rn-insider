import 'react-native-gesture-handler'
import React from "react";
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import {RootSiblingParent} from 'react-native-root-siblings'

import Routes from "./src/routes";

function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar backgroundColor = "#141a29"/>
        <Routes/>
      </NavigationContainer>
    </RootSiblingParent>
  )
}

export default App;