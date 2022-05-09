//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Color, ImageConstant} from '../Constatnts';
import {getFormattedDateTimeForNote} from '../Service/Service';

// create a component
const NoteList = ({notesData}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {notesData.length ? (
        <View style={styles.container}>
          {notesData.reverse().map((note, index) => (
            <View key={index} style={styles.singleNoteContainer}>
              <View style={styles.noteProfileImageContainer}>
                <Image source={note?.image} style={styles.noteProfileImage} />
              </View>
              <View style={styles.noteContentContainer}>
                <View style={styles.noteNameDateContainer}>
                  <View style={styles.noteCreatorNameContainer}>
                    <Text style={{color: Color.black, fontWeight: 'bold'}}>
                      {note?.name}
                    </Text>
                  </View>
                  <View style={styles.noteCreatedDateContainer}>
                    <Text style={{color: Color.bottomTabGrey}}>
                      {getFormattedDateTimeForNote(note?.noteDateTime)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text style={{color: Color.black}}>{note?.noteContent}</Text>
                </View>
              </View>
              <View style={styles.noteMore}>
                <TouchableOpacity>
                  <Image
                    source={ImageConstant.more}
                    style={styles.noteMoreIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noteNotAvailableContainer}>
          <Text style={{color: Color.bottomTabGrey}}>No notes available</Text>
        </View>
      )}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  singleNoteContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Color.oneShadeBelowGainsBoro,
  },
  noteProfileImageContainer: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteProfileImage: {width: 40, height: 40, borderRadius: 20},
  noteContentContainer: {
    flex: 8,
    flexDirection: 'column',
  },
  noteNameDateContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  noteCreatorNameContainer: {
    flex: 1.4,
    justifyContent: 'center',
  },
  noteCreatedDateContainer: {
    flex: 1.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteMore: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteMoreIcon: {width: 30, height: 30, borderRadius: 20},
  noteNotAvailableContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default NoteList;
