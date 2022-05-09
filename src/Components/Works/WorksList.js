//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Color, ImageConstant, windowDimention} from '../../Constatnts';
import {getFormattedDateForSingleOrder} from '../../Service/Service';

// create a component
const WorksList = ({workData}) => {
  return (
    <View style={styles.container}>
      {workData?.length ? (
        <View style={styles.workItemStyle}>
          {workData.map((work, index) => (
            <View key={index} style={styles.singleWorkMainContainer}>
              <View style={styles.singleWorkDateTimeStatus}>
                <View style={styles.singleWorkTrend}>
                  <View
                    style={{
                      borderRadius: 20,
                      backgroundColor:
                        work?.trendStatus == 'High'
                          ? Color.shadeRed
                          : Color.Bisque,
                      padding: 5,
                    }}>
                    <Image
                      source={ImageConstant.upArrow}
                      style={{
                        width: 15,
                        height: 15,
                        tintColor:
                          work?.trendStatus == 'High'
                            ? Color.darkRed
                            : Color.peru,
                        transform: [{rotate: '-90deg'}],
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color:
                        work?.trendStatus == 'High'
                          ? Color.darkRed
                          : Color.peru,
                      marginHorizontal: 10,
                    }}>
                    {work?.trendStatus}
                  </Text>
                </View>
                <View style={styles.dateTimeStatusContainer}>
                  <View style={{flex: 1}}>
                    <View style={styles.singleWorkCurrentStatus}>
                      <Text style={{color: Color.grey}}>
                        {work?.currentStatus}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateTimeContainer}>
                    <Text style={{color: Color.bottomTabGrey}}>
                      {getFormattedDateForSingleOrder(work?.workDate)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.workNumberMainContainer}>
                <View style={styles.workNumberSubContainer}>
                  <Text style={styles.workDescriptionStyle}>
                    {work?.workDescription}
                  </Text>
                  <Text style={{color: Color.grey}}>WON</Text>
                  <Text
                    style={
                      styles.workNumberStyle
                    }>{`#${work?.workNumber}`}</Text>
                </View>
                <View style={styles.workNumberContainerRightArrow}>
                  <Image
                    source={ImageConstant.rightArrow}
                    style={styles.rightArrowStyle}
                  />
                </View>
              </View>
              <View style={styles.customerProfileContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={work?.customer.customerImage}
                    style={styles.profileImageStyle}
                  />
                </View>

                <View style={styles.typeNameContainer}>
                  <Text style={{color: Color.bottomTabGrey}}>
                    {work?.customer.type}
                  </Text>
                  <Text style={{color: Color.black}}>
                    {work?.customer.name}
                  </Text>
                </View>
                <View style={styles.directionContainer}>
                  <Text style={styles.directionText}>Get Directions</Text>
                </View>
              </View>
              <View style={styles.poNoteContainer}>
                <View style={styles.otherPersonImageContainer}>
                  {work?.otherPerson.slice(0, 2).map((person, index) => (
                    <Image
                      source={person?.personImage}
                      key={index}
                      style={styles.otherPersonImage}
                    />
                  ))}
                </View>
                <View style={styles.poContainer}>
                  <Text style={{color: Color.black}}>{work?.poType}</Text>
                  <Image source={ImageConstant.note} style={styles.poIcon} />
                  <Text style={{color: Color.black}}>{work?.poCount}</Text>
                </View>
                <View style={styles.noteContainer}>
                  <Text style={{color: Color.black}}>{work?.noteType}</Text>
                  <Image source={ImageConstant.chat} style={styles.noteIcon} />
                  <Text style={{color: Color.black}}>{work?.noteCount}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.workItemNotFoundStyle}></View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  workItemStyle: {
    width: windowDimention.windowWidth - 30,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  workItemNotFoundStyle: {
    height: 200,
    width: windowDimention.windowWidth - 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleWorkMainContainer: {
    height: 350,
    width: '100%',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: Color.bottomTabGrey,
    marginBottom: 15,
    borderRadius: 5,
    padding: 10,
  },
  singleWorkDateTimeStatus: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'column',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: Color.oneShadeBelowGainsBoro,
  },
  singleWorkTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  singleWorkCurrentStatus: {
    backgroundColor: Color.gainsBoro,
    width: '50%',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  dateTimeStatusContainer: {flex: 1, flexDirection: 'row'},
  dateTimeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  workNumberMainContainer: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Color.oneShadeBelowGainsBoro,
    padding: 5,
  },
  workNumberSubContainer: {flex: 7, flexDirection: 'column'},
  workDescriptionStyle: {
    color: Color.black,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  workNumberStyle: {
    color: Color.deepSeaBlue,
    fontWeight: 'bold',
  },
  workNumberContainerRightArrow: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  rightArrowStyle: {width: 10, height: 15, tintColor: Color.grey},
  customerProfileContainer: {
    flex: 1.2,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Color.oneShadeBelowGainsBoro,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  profileImageContainer: {width: 45, alignItems: 'center'},
  profileImageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  typeNameContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    flex: 1,
  },
  directionContainer: {alignItems: 'flex-end', flex: 1},
  directionText: {
    color: Color.brightBlue,
    textDecorationLine: 'underline',
  },
  poNoteContainer: {
    flex: 1.2,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  otherPersonImageContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherPersonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
    marginRight: 5,
  },
  poContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  poIcon: {width: 20, height: 20, tintColor: Color.grey},
  noteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  noteIcon: {width: 20, height: 20, tintColor: Color.grey},
});

//make this component available to the app
export default WorksList;
