import Toast from 'react-native-simple-toast';
import {PermissionsAndroid, Alert, Linking} from 'react-native';
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const API_KEY='AIzaSyD-fku9_XH1dP5_ep6or7LIZNVEZ1GToGCY'
export const getFormattedDate = date => {
  let monthNumber = Number(String(date).split('-')[1]);
  return `${months[monthNumber - 1]} '${String(
    String(date).split('-')[2],
  ).substring(2)}`;
};

export const getFormattedDateForSingleOrder = date => {
  let monthNumber = Number(String(date).split('-')[1]);
  return `${String(date).split('-')[0]} ${months[monthNumber - 1]} '${String(
    String(date).split('-')[2],
  ).substring(2)}`;
};

export const getFormattedDateTimeForNote = dateTime => {
  let date = String(dateTime).split(' ')[0];
  let time = String(dateTime).split(' ')[1];

  let h = Number(time.split(':')[0]);
  let m = Number(time.split(':')[1]);

  let ampm = h >= 12 ? 'PM' : 'AM';
  let h1 = Number(h % 12);
  let hours = h1 ? h1 : 12;
  let minutes = m < 10 ? `0${m}` : m;
  let finalTime = hours + ':' + minutes + ' ' + ampm;

  let monthNumber = Number(String(date).split('-')[1]);
  return `${String(date).split('-')[0]} ${months[monthNumber - 1]} '${String(
    String(date).split('-')[2],
  )} | ${finalTime}`;
};

export const showToast = text => {
  Toast.show(text);
};

export const requestLocationPermission=async()=> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
      Alert.alert(
        'You need to enable location',
        'Goto your settings and give location permission. Otherwise map experience may be not satisfy you.',
        [
          {
            text: 'No',
            onPress: () => console.log('Pressed cancel'),
            style: 'cancel',
          },
          {
            text: 'Goto Settings',
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ],
        {cancelable: false},
      );
      return true;
    }
  } catch (err) {
    console.warn(err);
  }
}
