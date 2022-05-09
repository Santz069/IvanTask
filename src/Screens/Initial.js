//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {Color, ImageConstant, windowDimention} from '../Constatnts';

// create a component
const Initial = props => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    Alert.alert(
      'Are you sure?',
      'You want to exit',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
    return true;
  };
  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.splashIconContainer}>
            <Image source={ImageConstant.ivanLogo} style={styles.splashLogo1} />
            <Image
              source={ImageConstant.upArrow}
              style={styles.splashArrowIcon}
            />
            <Image
              source={ImageConstant.userPhoto}
              style={styles.splashLogo2}
            />
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.introContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={ImageConstant.ivanLogo}
                style={styles.splashLogo1}
              />
              <Image
                source={ImageConstant.upArrow}
                style={styles.splashArrowIcon}
              />
              <Image
                source={ImageConstant.userPhoto}
                style={styles.splashLogo2}
              />
            </View>
            <Text style={styles.assignmentText}>
              I am Santanu samanta. i have got an assignment task as my second
              round on May 5, 2022 and there have two question: (i) Design and
              (ii) Fuctionality
            </Text>
            <Text style={styles.assignmentText}>
              For check design screens click on '1. Design' and for
              functionality click on '2. Functionality'
            </Text>
          </View>
          <View style={styles.assignementNavigation}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('HomeScreen')}
              style={styles.designButton}>
              <Text style={{color: Color.darkGreen}}>1. Design</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Location')}
              style={styles.functionalityButton}>
              <Text style={{color: Color.darkRed}}>2. Functionality</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.screen,
  },
  splashIconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo1: {width: 80, height: 80, borderRadius: 30},
  splashArrowIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    tintColor: Color.bottomTabGrey,
  },
  splashLogo2: {width: 80, height: 80, borderRadius: 30},
  introContainer: {
    height: 300,
    width: windowDimention.windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignmentText: {
    color: Color.black,
    width: windowDimention.windowWidth - 80,
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'justify',
  },
  assignementNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: windowDimention.windowWidth,
  },
  designButton: {
    width: 130,
    height: 40,
    backgroundColor: Color.shadeGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  functionalityButton: {
    width: 130,
    height: 40,
    backgroundColor: Color.shadeRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

//make this component available to the app
export default Initial;
