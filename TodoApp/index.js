import React from 'react';
import { AppRegistry } from 'react-native';
import TodoList from './src/TodoList';
import { name as appName } from './app.json';

const App = () => {
  return <TodoList />;
};

AppRegistry.registerComponent(appName, () => App);
