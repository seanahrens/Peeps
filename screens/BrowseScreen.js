import React, { Component } from 'react';
import { TouchableHighlight, Modal, AppRegistry, SectionList, StyleSheet, Text, View, Button, Alert, TouchableOpacity, ScrollView, AndroidPermissions, FlatList} from 'react-native';
import { SearchBar, Icon, Badge, Input } from 'react-native-elements';
import GroupSelector from '../components/GroupSelector';
import ClosenessPicker from '../components/ClosenessPicker';
import CategoryButtons from '../components/CategoryButtons';
import { Permissions, Contacts, Location } from 'expo';

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
    this.state = {
      modalVisible: false,

      permission: '',
      search: '',

      contactsList: {},
      contactCount: 0,

      locale: {
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
      }
    }

  locale() {
    if (this.state.locale.city == null){
      return "...";
    } else {
      return `${this.state.locale.city}, ${this.state.locale.region}`;
    }
  }

  componentDidMount() {
    console.log('component mounted!');

    // TODO: Move this to app.js and make location globally accessible
    this.requestContactsPermission().then(() => {
      this.gatherContacts();
    }).then( () => { this.gatherLocation(); });
  }


  async requestContactsPermission() {
    this.state.permission = await Permissions.askAsync(Permissions.CONTACTS, Permissions.LOCATION);

    if (this.state.permission.status !== 'granted') {
      console.log("permissions denied")
      return;
    }
  }

  async gatherContacts() {
    Contacts.getContactsAsync().then( contacts => {
      console.log("total contacts:");
      console.log(contacts.data[0]);

      this.setState({contactsList: contacts.data.reverse()});
      this.setState({contactCount: contacts.total});
    }).catch( error => { console.log(error); });
  }

  async gatherLocation() {
    console.log("gathering location");

    Location.getCurrentPositionAsync().then( location => {
      console.log("location + coords:");
      console.log(location);
      console.log(location.coords);

      Location.reverseGeocodeAsync(location.coords).then( _region => {
        region = _region[0];
        console.log("region:");
        console.log(JSON.stringify(region));
        const region_data = {}

        if (region){
        //   this.setState({
        //     locale: {
        //       lat: location.latitude,
        //       lon: location.longitude,
        //       name: region.name,
        //       street: region.street,
        //       city: region.city,
        //       region: region.region,
        //       postalCode: region.postalCode,
        //       country: region.country,
        //     }
        //   });
        // } else {
        //   this.setState({
        //     locale: {
        //       lat: location.latitude,
        //       lon: location.longitude,
        //     }
        //   });
        }

        console.log("end reverse geocode");


      }).catch( error =>{ console.log(error); });

    }).catch( error =>{ console.log(error); });

    console.log("end gathering location");
  }

  _keyExtractor = (item, index) => item.id;

  updateSearch = search => {
    this.setState({ search });
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;

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
                    value={this.locale()}
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
              this.setState({test: false});
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
              {title: this.locale(), data: ['Eric', 'Diana', 'Jason', 'Anna', 'Lou', 'Andrew', 'Allan']},
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

          <Text style={styles.sectionHeader}>From Your Addressbook ({this.state.contactCount})</Text>
          <FlatList
            data={this.state.contactsList}
            extraData={this.state.contactsList}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.item}>{item.name}</Text>
              </View>
            )}
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
              //
              //
              // {title: 'Not Yet Imported', data: ['123 Designs', 'Aaron', 'Aaron','Aaron','Amanda','Ashley','Ashleigh','Bob','Brad','Brent','Bubu','Carl','Cameron','Candice','Connor','Colin','Deric','Derrick','Derilique','Erin','Zoe' ]},

//

//
//
//           <Text>{this.state.contactCount}</Text>
//           <Text>{this.state.contactsList.total}</Text>
// // <Button
// //   onPress={() => {
//     Alert.alert(`Contacts Count: ${this.state.contactsList[0].name}`);
//     //console.log(this.state.contactsList);
//   }}
//   title="beep"
//   color="darkgreen"
// />

// // <ClosenessPicker options={['Very Close Friends Only', 'At Least Friends', 'All']}/>
