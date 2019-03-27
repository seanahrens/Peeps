import React, { Component } from 'react';
import { TouchableHighlight, Modal, AppRegistry, SectionList, StyleSheet, Text, View, Button, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar, Icon, Badge, Input } from 'react-native-elements';
import GroupSelector from '../components/GroupSelector';
import ClosenessPicker from '../components/ClosenessPicker';
import CategoryButtons from '../components/CategoryButtons';

// const icon = require('./icon.png');


export default class BrowseScreen extends Component {
  static navigationOptions = {
    title: 'Browse Contacts',
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

  constructor(props) {
    super(props);
    this.state = {modalVisible: false, search: '',}
  }

  updateSearch = search => {
    this.setState({ search });
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { search } = this.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{marginTop: 0}}>


          <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={{marginTop: 0}}>
                <View style={styles.filters}>
                  <Text style={styles.h1}>Filters</Text>

                  <Input inputStyle={styles.locationInput}
                    value='San Francisco, CA'
                    leftIcon={{ type: 'material-icons', name: 'location-city' }}
                  />

                  <CategoryButtons categories={{relationship_type: true, closeness: true, gender: true}} selectedItems={{type: [0,1,2,3,4], joy: [0,1], gender: [0,1,2]}}/>

                  <View>
                    <GroupSelector placeholder='In These Groups...'/>
                  </View>

                  <Button
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                    title="Done"
                    color="darkgreen"
                    accessibilityLabel="Done"
                  />
                </View>
            </View>
          </Modal>

        </View>

        <View style={{flexDirection: 'row'}}>

          <SearchBar
            placeholder="Search Here..."
            onChangeText={this.updateSearch}
            value={search}
            containerStyle={{width: 300}}
            lightTheme={true}
          />
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}
            style={{width: 50, alignItems: 'center', backgroundColor: 'lightgray', flex: 1, flexDirection: 'row', padding: 7, }}>
            <View style={styles.filterContainer,{flexDirection: 'row'}}>
              <Icon type='material-community' name='filter'/>
              <Text>(2)</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <SectionList
            sections={[
              {title: 'San Francisco', data: ['Eric', 'Diana', 'Jason', 'Anna', 'Lou', 'Andrew', 'Allan']},
              {title: 'Sausalito', data: ['Abe']},
              {title: 'Oakland', data: ['Randy','Dustin','Deb']},
              {title: 'Palo Alto', data: ['Vinny','Josh','Jenny']},
            ]}
            renderItem={({item}) =>
              <TouchableOpacity
                onPress={ () => navigate('Profile', {name: item, sub_view: 'contact'}) }><Text style={styles.item}>{item}</Text>
              </TouchableOpacity>}
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    opacity: 0.5,
    backgroundColor: 'black',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  formLabel: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
  locationInput: {
    color: 'black',
  },
  filterContainer: {
    backgroundColor: 'lightgray',
  },
  filters: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 115,
    height: 700,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
   flex: 1,
   paddingTop: 5
  },
  sectionHeader: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
// <ClosenessPicker options={['Very Close Friends Only', 'At Least Friends', 'All']}/>
