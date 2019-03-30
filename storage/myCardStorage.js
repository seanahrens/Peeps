import { AsyncStorage } from 'react-native';
// import vCard from 'react-native-vcards'; // https://github.com/idxbroker/vCards-js/tree/react-native
// import { RNFS } from 'react-native-fs';

const STORAGE_KEY = 'MY_CARD';

const DEFAULT_DATA = {
  name: 'Juice in Da!',
  email: 'jindap@gmail.com',
};

export const loadMyCard = async () => {
  try {
    let data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data === null) { return DEFAULT_DATA; }

    return JSON.parse(data);
  } catch (error) {
    console.log('Error loading contact card', error);
  }
}

export const saveMyCard = (data) => {
  console.log('saving the follwing data: ', data);
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  //createVCard(data);
}


// export const createVCard = (data) => {
//   //create a new vCard
//   contact = vCard();
//
//   //set properties
//   contact.firstName = 'Eric';
//   contact.middleName = 'J';
//   contact.lastName = 'Nesser';
//   contact.organization = 'ACME Corporation';
//   contact.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
//   contact.workPhone = '312-555-1212';
//   contact.birthday = new Date('01-01-1985');
//   contact.title = 'Software Developer';
//   contact.url = 'https://github.com/enesser';
//   contact.note = 'Notes on Eric';
//
//   //save to file
//   //contact.saveToFile('./eric-nesser.vcf');
//
//   //get as formatted string
//   console.log("VCARD BABY!");
//   console.log(contact);
//
//   //console.log(vCard.getFormattedString());
//
// }
