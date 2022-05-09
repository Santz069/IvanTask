//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Color, ImageConstant, windowDimention} from '../Constatnts';
import { API_KEY } from '../Service/Service';


// create a component
const SearchInMap = ({getLatLongFromAddress,searchString}) => {
  const [searchAddress, setSearchAddress] = useState('');
  const [showSearchAddressList, setShowSearchAddressList] = useState(false);
  const [searchResult, setSearchResult] = useState([]);


  useEffect(()=>{
    setSearchAddress(searchString)
  },[searchString])

  const predictLocation = searchText => {
    setSearchAddress(searchText);
    setShowSearchAddressList(true);
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${searchText}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        try {
          if (responseJson.predictions.length) {
            setShowSearchAddressList(true);
            console.log('responseJson.predictions', responseJson.predictions);
            setSearchResult(responseJson.predictions);
          } else {
            setShowSearchAddressList(false);
            setSearchResult([]);
          }
        } catch (error) {
          console.log('error', error);
        }
      })
      .catch(error => {
        console.log('responseJson.predictions', error);
      });
  };

  const getSelctedAddressCoordinate = item => {
    if (item) {
      setSearchAddress(item.description);
      getLatLongFromAddress(item.description);
      setShowSearchAddressList(false);
    } else {
      getLatLongFromAddress(searchAddress);
      setShowSearchAddressList(false);
    }
  };

  const singleAddress = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.resultItem}
      onPress={() => getSelctedAddressCoordinate(item)}>
      <Text style={{color:Color.grey}}>{item.description} </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainActionContainer}>
      <View style={styles.subActionContainer}>
        <View style={styles.textInputContainerStyle}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Search Address"
            placeholderTextColor={Color.bottomTabGrey}
            onChangeText={e => predictLocation(e)}
            value={searchAddress}
          />
        </View>
        <View style={styles.searchButtonContainerStyle}>
          <TouchableOpacity
            onPress={() => getSelctedAddressCoordinate()}
            style={styles.searchIconButtonStyle}>
            <Image
              source={ImageConstant.search}
              style={styles.searchIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {showSearchAddressList && searchAddress ? (
          <FlatList
            data={searchResult}
            renderItem={({item, index}) => singleAddress(item, index)}
            keyExtractor={item => item.id}
            style={styles.searchResultsContainer}
          />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  mainActionContainer: {
    alignSelf: 'center',
    zIndex: 999,
    width: windowDimention.windowWidth - 40,
    height: 50,
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 40,
  },
  subActionContainer: {
    alignSelf: 'center',
    zIndex: 999,
    width: windowDimention.windowWidth - 40,
    height: 50,
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 40,
  },
  searchResultsContainer: {
    width: windowDimention.windowWidth - 40,
    padding: 10,
    backgroundColor: Color.white,
    position: 'absolute',
    borderRadius: 20,
    borderColor: Color.grey,
    top: 100,
  },
  resultItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Color.oneShadeBelowGainsBoro,
  },
  searchIconStyle: {
    width: 20,
    height: 20,
    tintColor: Color.bottomTabGrey,
  },
  searchIconButtonStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    height: '100%',
    width: '100%',
    paddingLeft:20
  },
  textInputContainerStyle: {
    flex: 4,
    backgroundColor: Color.white,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  searchButtonContainerStyle: {
    flex: 1,
    backgroundColor: Color.white,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
});

//make this component available to the app
export default SearchInMap;
