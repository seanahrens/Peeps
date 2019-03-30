import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Button, TouchableOpacity, Image, Text, KeyboardAvoidingView, PermissionsAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import t from 'tcomb-form-native';
//import Contacts from 'react-native-contacts';
import { Contacts } from 'expo';


const Form = t.form.Form;

const User = t.struct({
  name: t.maybe(t.String),
  nickname: t.maybe(t.String),
  phone: t.maybe(t.String),
  email: t.maybe(t.String),
  location: t.maybe(t.String),
  website: t.maybe(t.String),
  note: t.maybe(t.String),
});


const options = {
  i18n: {
    optional: '', // no optional text next to label
    required: '',
    add: 'Add',   // add button
    remove: '✘',  // remove button
    up: '↑',      // move up button
    down: '↓'     // move down button
  },
  fields: {
    name: {
      autoCapitalize: 'words',
    },
    nickname: {
      autoCapitalize: 'words',
      label: "Nick Name",
    },
    location: {
      autoCapitalize: 'words',
    },
    email: {
      autoCapitalize: 'none',
    },
    website: {
      autoCapitalize: 'none',
    },
  },
};

export default class MyCardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myCard: {
        location: "San Francisco, CA"
      },
    }
  }

  // async function checkMultiPermissions() {
  //   // const { Permissions } = Expo;
  //   // const { status, permissions } = await Permissions.askAsync(Permissions.CONTACTS);
  //   //
  //   // if (status === 'granted') {
  //   //   console.log('granted');
  //   // } else {
  //   //   throw new Error('Location permission not granted');
  //   // }
  // }


  // addNewContact() {
  //     var newPerson = {
  //     emailAddresses: [{
  //       label: "work",
  //       email: "mrniet@example.com",
  //     }],
  //     familyName: "Nietzsche",
  //     givenName: "Friedrich",
  //   }
  //
  //   Contacts.openContactForm(newPerson, (err, contact) => {
  //     if (err) throw err;
  //     console.log("contact has been opened");
  //   })
  // }


  async showFirstContactAsync() {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    const contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS,
        Contacts.EMAILS,
      ],
      pageSize: 10,
      pageOffset: 0,
    });
    if (contacts.total > 0) {
      Alert.alert(
        'Your first contact is...',
        `Name: ${contacts.data[0].name}\n` +
        `Phone numbers: ${contacts.data[0].phoneNumbers[0].number}\n` +
        `Emails: ${contacts.data[0].emails[0].email}`
      );
    }
  }

  componentDidMount() {
    //console.log('GrandChild did mount.');
    // checkMultiPermissions();
    showFirstContactAsync();
  }

  static navigationOptions = {
    title: 'Add Contact',
    headerRight: (
      <TouchableOpacity onPress={()=>{showFirstContactAsync();}}>
        <Icon
          type="material-community"
          name="settings"
          containerStyle={{marginRight: 10, opacity: 0.5}}
        />
      </TouchableOpacity>
    ),
  };


  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.container}>
            <Form
              ref={c => this._form = c}
              type={User}
              options={options}
              value={this.state.myCard}
            />
          </View>
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 220,
  },
  qr_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
