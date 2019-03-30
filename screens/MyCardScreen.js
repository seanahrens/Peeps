import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Button, TouchableOpacity, Image, Text, KeyboardAvoidingView } from 'react-native';
import { loadMyCard, saveMyCard } from '../storage/myCardStorage';
import { Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import t from 'tcomb-form-native';

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
  // stylesheet: formStyles,
};

export default class MyCardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myCard: {},
    }

    loadMyCard().then((data) => {
      this.setState({myCard: data});
    });
  }


  static navigationOptions = {
    title: 'My Card',
    headerRight: (
      <TouchableOpacity onPress={()=>{}}>
        <Icon
          type="material-community"
          name="settings"
          containerStyle={{marginRight: 10, opacity: 0.5}}
        />
      </TouchableOpacity>
    ),
  };


  handleChange = (value) => {
    // Update State and Save Data to Persistent Storage
    this.setState({myCard: value}, () => {
      saveMyCard(this.state.myCard);
    })
  }

  meCard = () => {
    return `MECARD:
                  N:${this.state.myCard.name || ''};
                  NICKNAME:${this.state.myCard.nickname || ''};
                  TEL:${this.state.myCard.phone || ''};
                  EMAIL:${this.state.myCard.email || ''};
                  ADR:${this.state.myCard.location || ''};
                  URL:${this.state.myCard.website || ''};
                  NOTE:${this.state.myCard.note || ''};
                  ;`;
  }


  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.qr_item}>
              <QRCode value={this.meCard()}
                  size={256}
                  bgColor='black' //#196F3D'
                  fgColor='white'
                  style={styles.QRCode}/>
              </View>
            <Form
              ref={c => this._form = c}
              type={User}
              options={options}
              value={this.state.myCard}
              onChange={(value) => this.handleChange(value)}
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
    // marginBottom: 220,
  },
  qr_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
});




//            N:Gump;Forrest;;Mr.;
//            PHOTO;MEDIATYPE=image/gif:http://www.example.com/dir_photos/my_photo.gif
//PHOTO;VALUE=URI;TYPE=GIF:http://www.example.com/dir_photos/my_photo.gif

// vCard = () => {
//   return `BEGIN:VCARD
//           VERSION:3.0
//           FN:${this.state.myCard.name || 'x'}
//           ORG:${this.state.myCard.website || 'x'}
//           TEL;TYPE=home,voice;VALUE=uri:tel:${this.state.myCard.phone || 'x'}
//           ADR;TYPE=WORK,PREF:;;${this.state.myCard.location || 'x'}
//           EMAIL:${this.state.myCard.email || 'x'}
//           REV:2008-04-24T19:52:43Z
//           END:VCARD`;
// }
//
//
// gCard = () => {
//   return   `BEGIN:VCARD
//     VERSION:3.0
//     N:Gump;Forrest;;Mr.;
//     FN:Forrest Gump
//     ORG:Bubba Gump Shrimp Co.
//     TITLE:Shrimp Man
//     PHOTO;VALUE=URI;TYPE=GIF:http://www.example.com/dir_photos/my_photo.gif
//     TEL;TYPE=WORK,VOICE:(111) 555-1212
//     TEL;TYPE=HOME,VOICE:(404) 555-1212
//     ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of America
//     LABEL;TYPE=WORK,PREF:100 Waters Edge\nBaytown\, LA 30314\nUnited States of America
//     ADR;TYPE=HOME:;;42 Plantation St.;Baytown;LA;30314;United States of America
//     LABEL;TYPE=HOME:42 Plantation St.\nBaytown\, LA 30314\nUnited States of America
//     EMAIL:forrestgump@example.com
//     REV:2008-04-24T19:52:43Z
//     END:VCARD`;
// }
