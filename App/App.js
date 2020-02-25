/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import Login from './src/components/login';
import Home from './src/components/home';
import Lista from './src/components/lista';
import Frame from './src/components/frame';
import Gallery from './src/components/lista/rollcamera';
import Remision from './src/components/remision';
import Search from './src/components/search';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

console.disableYellowBox = true;
const AppSwitchNavigator = createSwitchNavigator({
  inicio: { screen: Login },
  home: {screen: Home},
  lista: {screen: Lista},
  frame: {screen: Frame},
  Gallery: {screen: Gallery},
  Remision: {screen: Remision},
  Search: {screen: Search},
});
const AppContainer = createAppContainer(AppSwitchNavigator);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
