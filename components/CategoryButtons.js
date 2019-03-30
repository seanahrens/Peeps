import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonGroup, Button, Icon } from 'react-native-elements';



class CategoryButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    }
  }


  render() {
    const gender = [
      { element: () => <Icon type='font-awesome' name='female' /> },
      { element: () => <Icon type='font-awesome' name='genderless' /> },
      { element: () => <Icon type='font-awesome' name='male' /> }
    ]
    const closeness = [
      { element: () => <Icon type='material-community' name='emoticon-excited' /> },
      { element: () => <Icon type='font-awesome' name='smile-o' /> },
      { element: () => <Icon type='material-community' name='emoticon-happy' /> },
      { element: () => <Icon type='material-community' name='emoticon-neutral' /> },
    ]

    const relationship_type = [
      { element: () => <Icon type='material-community' name='account-heart' /> },
      { element: () => <Icon type='material-icons' name='person' /> },
      { element: () => <Icon type='material-community' name='tie' /> },
      { element: () => <Icon type='material-community' name='human-female-boy' /> },
      { element: () => <Icon type='material-community' name='heart-broken' /> },
    ]

    let relationshipTypeView;
    let closenessView;
    let genderView;

    if (this.props.categories['relationship_type']) {
      relationshipTypeView =
      <ButtonGroup
        onPress={this.updateCloseness}
        selectedButtonStyle={styles.selectedButtonStyle}
        selectedIndexes={this.props.selectedItems.type}
        buttons={relationship_type}
        containerStyle={{height: 40}}
      />;
    }

    if (this.props.categories['closeness']) {
      closenessView =
      <ButtonGroup
        onPress={this.updateCloseness}
        selectedButtonStyle={styles.selectedButtonStyle}
        buttons={closeness}
        selectedIndexes={this.props.selectedItems.joy}
        containerStyle={{height: 40}}
      />;
    }

    if (this.props.categories['gender']) {
      genderView =
      <ButtonGroup
        onPress={this.updateCloseness}
        selectedButtonStyle={styles.selectedButtonStyle}
        buttons={gender}
        selectedIndexes={this.props.selectedItems.gender}
        containerStyle={{height: 40}}
      />;
    }

    return (
      <View>
        {relationshipTypeView}
        {closenessView}
        {genderView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedButtonStyle: {
    backgroundColor: 'skyblue',
  }

  // container: {
  //   backgroundColor: '#222', borderColor: '#CDCDCD', borderWidth: 1
  // },
  // chipContainer: {
  //   padding: 20,
  //   marginTop: 50
  // }
});

export default CategoryButtons;

//
// <ButtonGroup
//   onPress={this.updateCloseness}
//   selectedButtonStyle={styles.selectedButtonStyle}
//   selectedIndexes={this.props.selectedItems.gender}
//   buttons={gender}
//   containerStyle={{height: 40}}
// />
