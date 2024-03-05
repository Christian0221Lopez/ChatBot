import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import AppNavigator from './app.navigator';

function App(){

  return (
    <SafeAreaView style = {{flex: 1}}>
    <AppNavigator/>
    </SafeAreaView>
  );
}

export default App;
