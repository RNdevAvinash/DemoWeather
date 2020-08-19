import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import WeatherForcast from './src/screens/WeatherForcast'

export default function App({ navigation, route }) {
  return (
      <View style={styles.container} >
        <WeatherForcast />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },

});

