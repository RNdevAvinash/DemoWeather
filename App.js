import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import WeatherForcast from './src/screens/WeatherForcast'
import { Provider } from 'react-redux'
import store from './src/redux/store'
export default function App({ navigation, route }) {
  return (
    <Provider store={store}>
      <View style={styles.container} >
        <WeatherForcast />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },

});

