//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Layout} from '../Components';
import {Color, ImageConstant, windowDimention} from '../Constatnts';
import {Dropdown} from 'react-native-element-dropdown';
import {WorksList} from '../Components/Works';
import Store from '../Store/Store';

const data = [
  {label: '1 Day', value: '1'},
  {label: '5 Days', value: '5'},
  {label: '7 Days', value: '7'},
  {label: '15 Days', value: '15'},
  {label: '30 Days', value: '30'},
];

// create a component
const WorksScreen = () => {
  const [viewByValue, setViewByValue] = useState('7');
  return (
    <Layout screenName="Works">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.heading}>View by :</Text>
              <Dropdown
                data={data}
                style={styles.dropdown}
                onChange={item => {
                  setViewByValue(item.value);
                }}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder=""
                value={viewByValue}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity>
                <Image
                  source={ImageConstant.filter}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Color.bottomTabGrey,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 5, flexDirection: 'column'}}>
            <Text style={{color: Color.bottomTabGrey,textAlign:'center',paddingVertical:15,fontSize:16}}>Sep, 2021</Text>
            <WorksList workData={Store.worksData}/>
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
    marginVertical: 10,
  },
  headingContainer: {
    height: 40,
    width: windowDimention.windowWidth - 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.bottomTabGrey,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  heading: {
    color: Color.bottomTabGrey,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    width: 100,
    paddingHorizontal: 8,
  },
});

//make this component available to the app
export default WorksScreen;
