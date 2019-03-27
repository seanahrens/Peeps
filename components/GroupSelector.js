import React from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { StyleSheet } from 'react-native';


// const icon = require('./icon.png');

const items = [
  {
    name: "Circles",
    id: 1,
    // icon: { uri: "https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png" }, // web uri
    children: [{
        name: "Co-Living",
        id: 19,
      },{
        name: "Festivals",
        id: 20,
      },{
        name: "20Mission",
        id: 21,
      },{
        name: "Ubuntu",
        id: 22,
      },{
        name: "Embassy",
        id: 23,
      },{
        name: "YC",
        id: 24,
      },{
        name: "DU",
        id: 25,
      },{
        name: "Organ House",
        id: 26,
      },{
        name: "Startups",
        id: 27,
      }]
  },
  // {
  //   name: "Contact Type",
  //   id: 2,
  //   // icon: { uri: "https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png" }, // web uri
  //   children: [{
  //       name: "Recently Added",
  //       id: 30,
  //     },{
  //       name: "Want to Connect with Soon",
  //       id: 31,
  //     },{
  //       name: "Archived",
  //       id: 32,
  //     }]
  // },
  // {
  //   name: "Relationship Type",
  //   id: 3,
  //   // icon: { uri: "https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png" }, // web uri
  //   children: [{
  //       name: "Friend",
  //       id: 10,
  //     },{
  //       name: "Lover",
  //       id: 17,
  //     },{
  //       name: "Love Interest",
  //       id: 13,
  //     },{
  //       name: "Family",
  //       id: 14,
  //     },{
  //       name: "Professional",
  //       id: 15,
  //     }]
  // },
]

class GroupSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  render() {
    return (
      <SectionedMultiSelect
        // styles={{container: styles.container}}
        // colors={{primary: '#ef5350', text: '#ef5350', chipColor: '#ef5350'}}
        items={items}
        uniqueKey='id'
        subKey='children'
        iconKey='icon'
        selectText={this.props.placeholder || 'Select...'}
        showDropDowns={true}
        readOnlyHeadings={true}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={this.state.selectedItems}
        expandDropDowns={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#222', borderColor: '#CDCDCD', borderWidth: 1
  // },
  // chipContainer: {
  //   padding: 20,
  //   marginTop: 50
  // }
});

export default GroupSelector;
