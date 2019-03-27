import React from 'react';
import { Picker } from 'react-native';
import { StyleSheet } from 'react-native';


class ClosenessPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <Picker
        selectedValue={this.state.language}
        style={{height: 50, width: 330}}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({language: itemValue})
        }>

        <Picker.Item label={this.props.options[0]} value="squad" />
        <Picker.Item label={this.props.options[1]} value="friends" />
        <Picker.Item label={this.props.options[2]} value="acquaintances" />

      </Picker>
    );
  }
}

export default ClosenessPicker;
