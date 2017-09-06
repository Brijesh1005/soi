import React from 'react';
import {
  StyleSheet, ListView, View, Text, TouchableOpacity, Picker
} from 'react-native';
import {Grid, Col, Row, List, ListItem, CheckBox } from 'react-native-elements';

export default class DropDown extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedValue: props.selectedValue || ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(item) {
    if(item) {
      this.setState({selectedValue: item});
      this.props.onSelectionChange(item, this.props.id, this.props.type);
    }
  }

  renderPickerItems() {
    const { data, labelKey, valueKey } = this.props;
    const picklistItem = [(<Picker.Item color='#555' key={0} label='Select one...' value='' />)];
    data && data.map((record) => {
      const item = (<Picker.Item color='#555' key={record[valueKey]} label={record[labelKey]} value={record[valueKey]} />);
      picklistItem.push(item);
    });
    return picklistItem;
  }

  render() {
    return (
      <Picker
        style={styles.listContainer}
        selectedValue={this.state.selectedValue}
        onValueChange={this.onChange}
        mode='dropdown'>
        { this.renderPickerItems() }
      </Picker>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex:1,
    marginLeft: 5,
    marginBottom: 0,
    marginRight: 0,
    height: 20
  }
});
