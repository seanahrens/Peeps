import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, TouchableOpacity, Image, Alert, TouchableHighlight, Dimensions } from 'react-native';
import { ButtonGroup, Button, Icon, Input } from 'react-native-elements';
import GroupSelector from '../components/GroupSelector';
import ClosenessPicker from '../components/ClosenessPicker';
import CategoryButtons from '../components/CategoryButtons';
import { TabView, SceneMap } from 'react-native-tab-view';

import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  phone: t.String,
  email: t.String,
});

var options = {
  fields: {
    name: {
      placeholder: 'Their Name'
    },
    phone: {
      placeholder: '(805)-231-7600'
    },
    email: {
      placeholder: 'theiremailaddress@gmail.com'
    },
  }
};


const relationshipView = () => (
  <View style={[styles.scene]}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('../assets/images/profile/profile-neutral.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <CategoryButtons categories={{relationship_type: true, closeness: true, gender: true}} selectedItems={{type: [1], joy: [2], gender: [0]}}/>

      <Input inputStyle={styles.noteInput}
        placeholder='San Francisco, CA'
        leftIcon={{ type: 'material-community', name: 'city' }}
      />
      <Input inputStyle={styles.noteInput}
        placeholder='Notes'
        leftIcon={{ type: 'material-community', name: 'pencil' }}
      />

      <GroupSelector placeholder="Add tags..."/>

      <Button
        style={styles.nextContact}
        onPress={() => {}}
        title="Next Contact"
        color="lightgreen"
        accessibilityLabel="Next Contact"
      />

    </View>
  </View>

);

const contactView = () => (
  <View style={[styles.scene]}>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require('../assets/images/profile/profile-neutral.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Form type={User} options={options} />
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Button
          onPress={()=>{}}
          title="Archive"
          color="black"
          accessibilityLabel=""
        />
        <Button
          style={styles.secondaryButton}
          onPress={() => {}}
          title="Import"
        />
      </View>

    </View>
  </View>
)










export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Contact',
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
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name'),
    };
  };


  state = {
    updateFlow: false,
    index: 0,
    routes: [
      { key: 'contact', title: 'Contact' },
      { key: 'relationship', title: 'Relationship to Me' },
    ],
  };


  render() {

    const { navigation } = this.props;
    if (navigation.state.params && navigation.state.params.context == 'updateFlow'){
      this.state.updateFlow = true;
      this.state.index = 1;
      navigation.state.params.context = null;
    } else {
      this.state.updateFlow = false;
    }

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          contact: contactView,
          relationship: relationshipView,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: 'lightgray'
  },
  scene: {
   flex: 1,
 },
  noteInput: {
    paddingBottom: 10,
  },
  container: {
    padding: 10,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  profileImage: {
    width: 160,
    height: 160,
    alignSelf: 'center'
  }
});
