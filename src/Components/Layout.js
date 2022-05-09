//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {windowDimention} from '../Constatnts';
import Header from './Header';

// create a component
const Layout = ({children,screenName}) => {
  return (
    <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.headerStyle}>
            <Header screenName={screenName}/>
          </View>
          <View style={{marginBottom:210}}>
              {children}
          </View>
        </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  outerContainer: {
    width: windowDimention.windowWidth,
    height: windowDimention.windowHeight,
  },
  innerContainer: {
    flexDirection: 'column',
  },
  headerStyle: {
    height: 60,
    width: windowDimention.windowWidth,
  },
});

//make this component available to the app
export default Layout;
