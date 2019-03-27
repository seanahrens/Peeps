import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';

import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import GroupSelector from '../components/GroupSelector';


// Contact Form
import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  phone: t.String,
  email: t.String,
  home_city: t.String,
  note: t.String
});

var options = {
  fields: {
    home_city: {
      placeholder: 'San Francisco, CA'
    }
  }
};



export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Contact',
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

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.qr_container}>

          <View style={styles.qr_item}>
            <Image
              source={require('../assets/images/qrcode.png')}
              style={styles.qr_code}
            />
          </View>
          <View style={styles.qr_item}>
            <Button
              onPress={()=>{}}
              title="Scan QR Code"
              color="black"
              accessibilityLabel="Scan a QR Code"
            />
          </View>
        </View>

        <View style={styles.form}>
          <Form type={User} options={options} />

          <TouchableHighlight onPress={()=>{}} style={styles.buttonIcon}>
             <View style={{flexDirection: 'row'}}>
                <Icon type='material-community' name='camera' style={styles.iconInButton}/>
                <Text style={styles.textInButton}>Add Photo</Text>
             </View>
          </TouchableHighlight>

          <GroupSelector placeholder='Add Contact to Groups...'/>
          <Button
            onPress={() => {}}
            title="Add Contact"
            color="darkgreen"
            accessibilityLabel="Add Contact"
          />
        </View>

        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  buttonIcon: {
    width: 320,
    height: 40,
    backgroundColor: 'lightgray',
  },
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  form: {
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 220,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },


  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 5,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },

  qr_container: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  qr_item: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%' // is 50% of container width
  },
  qr_code: {
    height: 140,
    width: 140
  }
});
