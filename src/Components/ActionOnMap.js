//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Color, ImageConstant, windowDimention} from '../Constatnts';

// create a component
const ActionOnMap = ({
  isZoomInBoundExceed,
  isZoomOutBoundExceed,
  isCurrentLocationFetched,
  ZoomInMap,
  ZoomOutMap,
  getLocation,
}) => {
  return (
    <View style={styles.mainActionContainer}>
      <View style={styles.zoomInOutButtonStyle}>
        <TouchableOpacity
          onPress={() => ZoomInMap()}
          disabled={isZoomInBoundExceed}>
          <View style={styles.plusButtonContainerStyle}>
            <Image
              source={ImageConstant.plus}
              style={{
                width: 20,
                height: 20,
                tintColor: isZoomInBoundExceed
                  ? Color.bottomTabGrey
                  : Color.black,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => ZoomOutMap()}
          disabled={isZoomOutBoundExceed}>
          <View style={styles.minusButtonContainerStyle}>
            <Image
              source={ImageConstant.minus}
              style={{
                width: 18,
                height: 30,
                tintColor: isZoomOutBoundExceed
                  ? Color.bottomTabGrey
                  : Color.black,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.targetStyle}>
        <TouchableOpacity onPress={() => getLocation()}>
          <Image
            source={ImageConstant.target}
            style={{
              width: 25,
              height: 25,
              tintColor: isCurrentLocationFetched
                ? Color.brightBlue
                : Color.black,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
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
  targetStyle: {
    width: 40,
    height: 40,
    backgroundColor: Color.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainActionContainer: {
    width: 40,
    height: 120,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: windowDimention.windowHeight - 180,
  },
  zoomInOutButtonStyle: {
    width: 40,
    height: 80,
    flexDirection: 'column',
    backgroundColor: Color.white,
    marginBottom: 5,
    borderRadius: 5,
  },
  plusButtonContainerStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Color.bottomTabGrey,
  },
  minusButtonContainerStyle: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default ActionOnMap;
