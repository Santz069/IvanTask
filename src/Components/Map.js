//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  PROVIDER_DEFAULT,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Color, ImageConstant, windowDimention} from '../Constatnts';
import ActionOnMap from './ActionOnMap';
import SearchInMap from './SearchInMap';
import Geocoder from 'react-native-geocoding';
import {API_KEY, requestLocationPermission, showToast} from '../Service/Service';
import NetInfo from '@react-native-community/netinfo';

// Initialize the module (needs to be done only once)
Geocoder.init('AIzaSyD-fku9_XH1dP5_ep6or7LIZNVEZ1GToGCY'); // use a valid API key


const config = {
  maximumAge: 5000,
  timeout: 5000,
  enableHighAccuracy: true,
};

// create a component
const Map = () => {
  const [isNetAvailable, setIsNetAvailable] = useState(true);
  const [region, setRegion] = useState({
    latitude: 22.1831801,
    longitude: 87.90409,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [searchAddress, setSearchAddress] = useState('');
  const [isCurrentLocationFetched, setIsCurrentLocationFetched] =
    useState(true);
  const [isZoomInBoundExceed, setIsZoomInBoundExceed] = useState(false);
  const [isZoomOutBoundExceed, setIsZoomOutBoundExceed] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsNetAvailable(state.isConnected);
    });

    getLocation();

    return () => {
      unsubscribe();
    };
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(
          'position',
          position.coords.latitude,
          position.coords.longitude,
        );
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        setIsCurrentLocationFetched(true);

        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            position.coords.latitude +
            ',' +
            position.coords.longitude +
            '&key=' +
            `${API_KEY}`,
        )
          .then(response => response.json())
          .then(responseJson => {
            try {
              setSearchAddress(responseJson.results[0].formatted_address);
            } catch (error) {
              setSearchAddress('');
              showToast('Sorry, Unable to get Address!');
            }
          });
      },
      err => {
        setIsCurrentLocationFetched(false);
        showToast('Sorry, Unable to get Address!');
        setSearchAddress('');
      },
      config,
    );
  };

  const getMarkerValue = value => {
    if (
      region.latitude != value.nativeEvent.coordinate.latitude ||
      region.longitude != value.nativeEvent.coordinate.longitude
    ) {
      setIsCurrentLocationFetched(false);
    }
    let Lat = value.nativeEvent.coordinate.latitude;
    let Lan = value.nativeEvent.coordinate.longitude;
    setRegion({
      latitude: value.nativeEvent.coordinate.latitude,
      longitude: value.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setIsZoomInBoundExceed(false);
    setIsZoomOutBoundExceed(false);

    console.log(
      'Lat Lan',
      value.nativeEvent.coordinate.latitude,
      value.nativeEvent.coordinate.longitude,
    );

    Geolocation.getCurrentPosition(
      () => {
        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            Lat +
            ',' +
            Lan +
            '&key=' +
            `${API_KEY}`,
        )
          .then(response => response.json())
          .then(responseJson => {
            try {
              setSearchAddress(responseJson.results[0].formatted_address);
                
            } catch (error) {
              showToast('Sorry, Unable to get Address!');
              setSearchAddress('');
            }
          });
      },
      err => {
        setIsCurrentLocationFetched(false);
        showToast('Sorry, Unable to get Address!');
        setSearchAddress('');
      },
      config
    );
  };

  const getLocationOnMarkerDrag = (latitude, longitude) => {
    Geolocation.getCurrentPosition(
      () => {
        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            latitude +
            ',' +
            longitude +
            '&key=' +
            `${API_KEY}`,
        )
          .then(response => response.json())
          .then(responseJson => {
            try {
              setSearchAddress(responseJson.results[0].formatted_address);
              setIsCurrentLocationFetched(false)
            } catch (error) {
              showToast('Sorry, Unable to get Address!');
              setSearchAddress('');
            }
          });
      },
      err => {
        setIsCurrentLocationFetched(false);
        showToast('Sorry, Unable to get Address!');
        setSearchAddress('');
      },
      config,
    );
  };

  const ZoomInMap = () => {
    if (Number(region.latitudeDelta) > Number(0.00018780518379303966)) {
      setRegion({
        ...region,
        latitudeDelta: region.latitudeDelta / 1.2,
        longitudeDelta: region.longitudeDelta / 1.2,
      });
      setIsZoomInBoundExceed(false);
      setIsZoomOutBoundExceed(false);
    } else {
      setIsZoomInBoundExceed(true);
    }
  };
  const ZoomOutMap = () => {
    if (region.latitudeDelta < Number(94.35)) {
      setRegion({
        ...region,
        latitudeDelta: region.latitudeDelta * 1.2,
        longitudeDelta: region.longitudeDelta * 1.2,
      });
      setIsZoomInBoundExceed(false);
      setIsZoomOutBoundExceed(false);
    } else {
      setIsZoomOutBoundExceed(true);
    }
  };

  const getLatLongFromAddress = searchString => {
    Geocoder.from(searchString)
      .then(json => {
        var location = json.results[0].geometry.location;
        if (
          location.lat != region.latitude ||
          location.lng != region.longitude
        ) {
          setIsCurrentLocationFetched(false);
        } else {
          setIsCurrentLocationFetched(true);
        }
        if (json.status == 'OK') {
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setSearchAddress(json.results[0].formatted_address);
        } else {
          showToast('Sorry! Unable to get location');
        }
      })
      .catch(error => {
        console.log('fromAddresserror', error);
        showToast('Something went wrong!');
      });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {isNetAvailable ? (
          <>
            <SearchInMap
              getLatLongFromAddress={text => getLatLongFromAddress(text)}
              searchString={searchAddress}
            />
            <MapView
              region={region}
              provider={PROVIDER_DEFAULT}
              style={{
                width: windowDimention.windowWidth,
                height: windowDimention.windowHeight - 30,
              }}
              onPress={e => getMarkerValue(e)}>
              <TouchableOpacity>
                <Marker
                  draggable
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                  onDragEnd={e => {
                    setRegion({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }),
                      getLocationOnMarkerDrag(
                        e.nativeEvent.coordinate.latitude,
                        e.nativeEvent.coordinate.longitude,
                      );
                  }}
                  title="Pin Location"
                  description={searchAddress}
                  // style={{height:60,width:60}}
                >
                  <Image
                    source={ImageConstant.locationPin}
                    style={{width: 30, height: 50}}
                  />
                </Marker>
              </TouchableOpacity>
            </MapView>

            <ActionOnMap
              isZoomInBoundExceed={isZoomInBoundExceed}
              isZoomOutBoundExceed={isZoomOutBoundExceed}
              isCurrentLocationFetched={isCurrentLocationFetched}
              ZoomInMap={() => ZoomInMap()}
              ZoomOutMap={() => ZoomOutMap()}
              getLocation={() => getLocation()}
            />
          </>
        ) : (
          <View style={styles.noInternet}>
            <Image
              source={ImageConstant.nowifi}
              style={{width: 50, height: 50, tintColor: Color.darkGrey}}
            />
            <TouchableOpacity style={styles.refreshButton}>
              <Text style={{color: Color.grey}}>Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  map: {
    width: windowDimention.windowWidth,
    height: windowDimention.windowHeight,
  },
  noInternet: {
    width: windowDimention.windowWidth,
    height: windowDimention.windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  refreshButton: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: Color.oneShadeBelowGainsBoro,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Map;
