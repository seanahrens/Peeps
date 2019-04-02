import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    permission: '',

    phoneContacts: {}, // direct copy of contacts returned by contacts API
    appContacts: {}, // (grouped by locale)

    myLocation: {
      lat: null,
      lon: null,
      name: null, //"1600",
      street: null, //"Amphitheatre Parkway",

      city: null, //": "Mountain View",
      region: null, //"California",

      postalCode: null, //"94043",
      isoCountryCode: null, //"US",
      country: null, //"United States",
    },

  };


  // hasLocaleChanged?(){
  //   // currentLocale = currentLocale();
  //   // if currentLocale !== this.state.myLocale { // there may be location specific code avai
  //   //   this.setState({ myLocale: currentLocale })
  //   //   this.setState({ contacts: sortContactsByLocale(currentLocale) });
  //   // }
  // }
  //
  // sortContactsByLocale(){
  //   // return contacts.arraySort((a,b){ latLonDistance(a.lat,a.lon,b.lat,b.lon) })
  // }
  //
  // latLonDistance(){
  //   // return (a.lat - b.lat + a.lon - b.lon);
  // }




  render() {

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (

        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
