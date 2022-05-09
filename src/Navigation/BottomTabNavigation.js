//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Color, ImageConstant, windowDimention} from '../Constatnts';
import {HomeScreen, POScreen, WorksScreen} from '../Screens';
import Modal from 'react-native-modal';
import Store from '../Store/Store';
import {NoteList} from '../Components';
import { showToast } from '../Service/Service';

const Tab = createBottomTabNavigator();

const tabIcons = [
  ImageConstant.home,
  ImageConstant.work,
  ImageConstant.purchaseOrder,
  ImageConstant.menu,
];

// create a component
const BottomTabNavigation = () => {
  function MyTabBar({state, descriptors, navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [notesList, setNotesList] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');

    useEffect(() => {
      if (Store.notesData.length) {
        setNotesList(Store.notesData);
      } else {
        setNotesList([]);
      }
    }, []);

    const getNoteList = text => {
      setSearchString(text);
      if (text) {
        if (Store.notesData.length) {
          let searchList = Store.notesData.filter(
            note =>
              String(note?.name).includes(text) ||
              String(note?.noteContent).includes(text),
          );
          if (searchList.length) {
            setNotesList(searchList);
          } else {
            setNotesList([]);
          }
        } else {
          setNotesList([]);
        }
      } else {
        if (Store.notesData.length) {
          setNotesList(Store.notesData);
        } else {
          setNotesList([]);
        }
      }
    };

    const saveNewNotes = () => {
      if (newNoteContent) {
        console.log('Today Date Time', new Date().toLocaleTimeString());
        console.log('Today Date Time', new Date().toLocaleDateString());

        let newNote = {
          noteId: getRndInteger(100000, 999999),
          name: 'Johan Smith',
          image: ImageConstant.userPhoto,
          noteContent: newNoteContent,
          noteDateTime: `${new Date().toLocaleDateString().split('/')[1]}-${
            new Date().toLocaleDateString().split('/')[0]
          }-${
            new Date().toLocaleDateString().split('/')[2]
          } ${new Date().toLocaleTimeString()}`,
        };

        Store.notesData.push(newNote);
        setNotesList([...notesList, ...[newNote]]);
        setNewNoteContent('');
      } else {
        showToast('Please enter note content')
      }
    };

    const getRndInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return (
      <View style={{borderTopWidth: 0.5, borderTopColor: Color.bottomTabGrey}}>
        <View style={{flexDirection: 'row'}}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({name: route.name, merge: true});
              }
            };

            return (
              <TouchableOpacity
                disabled={index == 2 || index == 3 ? true : false}
                key={index}
                accessibilityRole="button"
                onPress={onPress}
                style={styles.container}>
                <View style={styles.bottomTabItem}>
                  <Image
                    source={tabIcons[index]}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: isFocused ? Color.black : Color.bottomTabGrey,
                    }}
                  />
                  <Text
                    style={{
                      color: isFocused ? Color.black : Color.bottomTabGrey,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.addWork}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={ImageConstant.plus} style={styles.addWorkIcon} />
          </TouchableOpacity>
        </View>

        {/* Add Note Modal */}

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          onDismiss={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.addnoteTextContainer}>
                <View style={{flex: 1}}></View>
                <View style={{flex: 7, alignItems: 'center'}}>
                  <Text style={styles.addNote}>ADD NOTES</Text>
                </View>

                <View style={styles.closeIcon}>
                  <TouchableOpacity
                    style={{borderRadius: 20}}
                    onPress={() => {
                      setModalVisible(false), setNewNoteContent('');
                    }}>
                    <Image
                      source={ImageConstant.plus}
                      style={styles.noteModalCloseIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Notes Add */}
              <View style={styles.addNoteActionContainer}>
                <Text style={{color: Color.black, marginBottom: 10}}>
                  Add Note
                </Text>
                <TextInput
                  placeholder="Add Note"
                  placeholderTextColor={Color.darkGrey}
                  style={styles.addNoteTextfield}
                  onChangeText={text => setNewNoteContent(text)}
                  value={newNoteContent}
                />
                <View style={styles.addNoteButtonContainer}>
                  <TouchableOpacity
                    onPress={() => setNewNoteContent('')}
                    style={styles.cancelButton}>
                    <Text style={{color: Color.grey}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => saveNewNotes()}
                    style={styles.saveButton}>
                    <Text style={{color: Color.white}}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Search Note */}

              <View style={styles.noteSearchContainer}>
                <View style={styles.searchIconContainer}>
                  <Image
                    source={ImageConstant.search}
                    style={styles.searchIcon}
                  />
                </View>
                <View style={{flex: 1}}>
                  <TextInput
                    placeholder="Search note..."
                    placeholderTextColor={Color.darkGrey}
                    style={styles.searchTextfield}
                    onChangeText={text => getNoteList(text)}
                    value={searchString}
                  />
                </View>
              </View>

              <NoteList notesData={notesList} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Works" component={WorksScreen} />
      <Tab.Screen name="PO" component={POScreen} />
      <Tab.Screen name="Menu" component={POScreen} />
    </Tab.Navigator>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTabItem: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    // padding: 5,
  },
  bottomIcons: {
    width: 20,
    height: 20,
  },
  addWork: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: Color.deepSeaBlue,
    marginTop: -50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  addWorkIcon: {
    height: 25,
    width: 25,
    tintColor: Color.white,
    margin: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    marginLeft: -20,
    backgroundColor: Color.darkGrey,
    padding: 20,
    width: windowDimention.windowWidth,
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    // margin: 20,
    width: windowDimention.windowWidth,
    minHeight: 430,
    backgroundColor: Color.screen,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: -50,
    elevation: 5,
  },
  addnoteTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
    marginVertical: 10,
  },
  addNote: {
    color: Color.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteModalCloseIcon: {
    height: 20,
    width: 20,
    tintColor: Color.darkGrey,
    transform: [{rotate: '45deg'}],
  },
  closeIcon: {flex: 1, alignItems: 'flex-end'},
  addNoteActionContainer: {
    flexDirection: 'column',
    width: '100%',
    height: 120,
    marginVertical: 10,
  },
  addNoteTextfield: {
    backgroundColor: Color.oneShadeBelowGainsBoro,
    borderRadius: 5,
    paddingLeft: 20,
  },
  addNoteButtonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    height: 45,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButton: {
    height: 45,
    width: 100,
    backgroundColor: Color.brightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  noteSearchContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.oneShadeBelowGainsBoro,
    borderRadius: 5,
    marginVertical: 30,
  },
  searchIconContainer: {
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {width: 20, height: 20, tintColor: Color.darkGrey},
  searchTextfield: {height: '100%', width: '100%'},
});

//make this component available to the app
export default BottomTabNavigation;
