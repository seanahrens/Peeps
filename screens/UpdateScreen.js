import React, { Component } from 'react';
import { View, StyleSheet, SectionList, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  phone: t.String,
  email: t.String,
  facebook: t.String,
  note: t.String
  //terms: t.Boolean
});


export default class UpdateScreen extends React.Component {
  static navigationOptions = {
    title: 'Recently Added',
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

  profilePage(){
   this.props.navigator.push({
      id: 'BrowseScreen',
      name: 'Browse',
   });
 }

 componentDidMount() {
   // const {navigate} = this.props.navigation;
   // navigate('Profile', {name: 'Joanna'})
 }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.masterSectionHeader}>Need Categorization</Text>
        <SectionList
          sections={[
            {title: 'Added Today', data: ['Aaron']},
            {title: 'Added Yesterday', data: ['Maggie', 'Joanna']},
          ]}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={ () => navigate('Profile', {name: item, context: 'updateFlow'}) } style={styles.uncategorizedRow}><View style={styles.rowItem}><Text style={styles.item}>{item}</Text><Text style={styles.locationText}>San Francisco, CA</Text></View>
            </TouchableOpacity>}
          renderSectionHeader={({section}) => <View style={styles.sectionHeader}><Text>{section.title}</Text><Text>in...</Text></View>}
          keyExtractor={(item, index) => index}
        />
        <Text style={styles.masterSectionHeader}>Categorized</Text>
        <SectionList
          sections={[
            {title: 'Added Last Week', data: ['Eric', 'Diana', 'Jason', 'Anna', 'Lou', 'Andrew', 'Allan', 'Joe Peppin','Mike Souder', 'Ben W', 'Katie Camden']},
          ]}
          renderItem={({item}) =>
            <TouchableOpacity
              onPress={ () => navigate('Profile', {name: item, context: 'updateFlow'}) } style={styles.categorizedRow}><View style={styles.rowItem}><Text style={styles.item}>{item}</Text><Text style={styles.locationText}>San Juan, PR</Text></View>
            </TouchableOpacity>}
          renderSectionHeader={({section}) => <View style={styles.sectionHeader}><Text>{section.title}</Text><Text>in...</Text></View>}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  categorizedRow: {
  },
  uncategorizedRow: {
    backgroundColor: 'skyblue',
  },
  container: {
  },
  masterSectionHeader: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#EEE',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  locationText: {
    paddingRight: 10,
    fontSize: 12,
    textAlign: 'right',
  }
});
