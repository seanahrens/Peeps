import React, { Component, Map } from 'react';
import { ScrollView, View, StyleSheet, Button, TouchableOpacity, Image, Text, KeyboardAvoidingView, TouchableHighlight, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import t from 'tcomb-form-native';
import { Permissions, Contacts } from 'expo';
import Autocomplete from 'react-native-autocomplete-input';

import cities from '../data/cities15k_by_name.json'


const Form = t.form.Form;
const User = t.struct({
  name: t.maybe(t.String),
  nickname: t.maybe(t.String),
  phone: t.maybe(t.String),
  email: t.maybe(t.String),
  website: t.maybe(t.String),
  note: t.maybe(t.String),
});

const formOptions = {
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
    email: {
      autoCapitalize: 'none',
    },
    website: {
      autoCapitalize: 'none',
    },
  },
};


export default class AddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: {}, // MOVE THESE UP TO APP.js
      city_names: [], // MOVE THESE UP TO APP.js

      city_query: "",
      city_id_chosen: null, // DEFAULT THIS TO MY_LOCATION
      city_name_chosen: null, // DEFAULT THIS TO MY_LOCATION

      hideResults: false,
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }


  async requestContactsPermission() {
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== 'granted') {
      console.log("permission for contacts denied")
      return;
    } else {
      this.gatherContacts();
    }
  }

  componentDidMount() {
    this.requestContactsPermission();
    this.setState({cities: cities});
    this.setState({city_names: Object.keys(cities)});
  }

  async gatherContacts(){
    Contacts.getContactsAsync().then(function(contacts){
    }).catch(function(error) {
      console.log('There has been a problem getting the contacts: ' + error.message);
    })
  }

  async handleFormSubmit(){
    var formValues = this.refs["form"].getValue();

    this.props.addContactToApp(formValues);

    const contact = {
      [Contacts.Fields.name]: formValues.name,
      [Contacts.Fields.nickname]: formValues.nickname,
      [Contacts.Fields.phoneNumbers]: [formValues.phone],
      [Contacts.Fields.emails]: [formValues.email],
      [Contacts.Fields.urlAddresses]: [formValues.website],
      [Contacts.Fields.note]: [formValues.note],

      [Contacts.Fields.addresses]: [location],
    }

    Contacts.addContactAsync(contact).then(function(addedContact){

    }).catch(function(error) {
      console.log('There has been a problem saving the contact: ' + error.message);
    })
  }


  static navigationOptions = {
    title: 'Add Contact',
  };


  handleCitySelection(city_name){
    console.log(cities[city_name]);

    this.setState({ city_query: city_name });
    this.setState({ city_id_chosen: cities[city_name].id });
    this.setState({ city_name_chosen: city_name });
    this.setState({ hideResults: true });
  }

  findCity(city_query) {
    if (city_query.length < 4) { return []; }
    const regex = new RegExp(`${city_query.trim()}`, 'i');
    return this.state.city_names.filter(name => name.search(regex) >= 0);
  }



  render() {
    const { city_query } = this.state;
    const suggested_cities = this.findCity(city_query);


    return (
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center',}} behavior="padding" enabled keyboardVerticalOffset={100}>
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.container}>

            <Autocomplete
              data={suggested_cities}
              defaultValue={city_query}
              onChangeText={text => this.setState({ city_query: text, hideResults: false })}
              hideResults={this.state.hideResults}
              renderItem={city_name => (
                <TouchableOpacity onPress={() => this.handleCitySelection(city_name)}>
                  <Text>{city_name}</Text>
                </TouchableOpacity>
              )}
            />

            <Form
              ref="form"
              type={User}
              options={formOptions}
            />
            <Button style={styles.button} title="Add Contact" onPress={this.handleFormSubmit}></Button>
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
  // const contacts = await Contacts.getContactsAsync({
  //   fields: [
  //     Contacts.PHONE_NUMBERS,
  //     Contacts.EMAILS,
  //   ],
  //   pageSize: 10,
  //   pageOffset: 0,
  // });
  // if (contacts.total > 0) {
  //   Alert.alert(
  //     'Your first contact is...',
  //     `Name: ${contacts.data[0].name}\n` +
  //     `Phone numbers: ${contacts.data[0].phoneNumbers[0].number}\n` +
  //     `Emails: ${contacts.data[0].emails[0].email}`
  //   );
  //
  // } else {
  //   Alert.alert(
  //     'No contacts in your book!'
  //   );
  // }
