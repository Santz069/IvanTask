//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Layout} from '../Components';
import { ScoreScheduleChart } from '../Components/Home';
import {Color, windowDimention} from '../Constatnts';

// create a component
const HomeScreen = () => {
  return (
    <Layout screenName="Home">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>My Board</Text>
          </View>
          <View style={{flex: 5}}>
            <ScoreScheduleChart/>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginVertical:10
  },
  heading: {
    color: Color.black,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingVertical:10
  },
  headingContainer: {
    flex: 1,
  },
});

//make this component available to the app
export default HomeScreen;
