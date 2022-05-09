//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import {HomeScreen, Initial, Location} from '../Screens';

const Stack = createNativeStackNavigator();

// create a component
const StackNavigation = (props) => {
  return (
    <Stack.Navigator initialRouteName='Initial'>
      <Stack.Screen name="Initial" component={Initial} options={{headerShown:false}}/>
      <Stack.Screen name="HomeScreen" component={BottomTabNavigation}  options={{headerShown:false}}/>
      <Stack.Screen name="Location" component={Location} options={{headerTransparent:true, headerTitle:''}}/>
    </Stack.Navigator>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default StackNavigation;
