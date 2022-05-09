//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Color, ImageConstant, windowDimention} from '../Constatnts';

// create a component
const Header = ({screenName}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerFirst}>
        {screenName == 'Home' ? (
          <Image source={ImageConstant.userPhoto} style={styles.profileImage} />
        ) :screenName == 'Works'? (
          <Text style={styles.heading}>Works</Text>
        ):<></>}
      </View>
      <View style={styles.headerSecond}>
        {screenName == 'Home' || screenName == 'Works' ? (
          <>
            <Image source={ImageConstant.search} style={styles.headerIcon} />
            <Image
              source={ImageConstant.notification}
              style={styles.headerIcon}
            />
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: windowDimention.windowWidth-20,
    height: '100%',
    flexDirection: 'row',
  },
  headerFirst: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 5,
  },
  headerSecond: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: Color.bottomTabGrey,
    marginHorizontal: 5,
  },
  heading: {
    color: Color.black,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingVertical:10
  },
});

//make this component available to the app
export default Header;
