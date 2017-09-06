import React from 'react';
import {
  StyleSheet, ListView, View, Text, TouchableOpacity
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import Toast from 'react-native-simple-toast';

export default class AddRole extends React.Component {
  constructor (props) {
    super(props);
    this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.count = 1;
    this.records = [{ rowId: 0, competency: ''}];
    this.state = {
      roleName: '',
      competencyDataSource: this._ds.cloneWithRows(this.records),
      mandateField: false
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.addCompetencies = this.addCompetencies.bind(this);
    this.addRole = this.addRole.bind(this);
    this.onCompetencyChange = this.onCompetencyChange.bind(this);
    this.renderCompetency = this.renderCompetency.bind(this);
    this.renderHiddenRow = this.renderHiddenRow.bind(this);
    this.validate = this.validate.bind(this);
  }

  onChangeName(roleName) {
    this.setState({
      roleName,
      mandateField: false
    });
  }

  addCompetencies = () => {
    const newRow = { rowId: this.count++, competency: ''};
    this.records.push(newRow);
    this.setState({competencyDataSource: this._ds.cloneWithRows(this.records)});
  }

  onCompetencyChange = (id, value) => {
    const updatedRecord = this.records.find(row => row.rowId === id);
    updatedRecord.competency = value || '';
    this.setState({competencyDataSource: this._ds.cloneWithRows(this.records)});
  }

  closePopup = () => {
    this.props.closeModal();
  }

  validate = () => {
    if(!this.state.roleName)
      return false;
    else
      return true;
  }

  addRole = () => {
    var isValidate = this.validate();
    if(!isValidate) {
      this.setState({
        mandateField: true
      });
      return;
    }
    let competencies = [];
    this.records.forEach((data, id) => {
      if(!data.competency) {
        return;
      }
      competencies.push({"competencies": data.competency});
    });
    let roleData = {
      "roleName": this.state.roleName,
      "roleCompetencies": competencies
    };
    this.setState({
      mandateField: false
    });
    if(roleData.roleCompetencies.length === 0)
      Toast.show('Add at least one competencies.');
    else {
      this.props._actions.createNewRole(roleData);
      this.props.closeModal();
    }
  }

  deleteRow(secId, rowId, rowMap) {
    this.records.splice(rowId, 1);
    rowMap[`${secId}${rowId}`].closeRow();
    delete rowMap[`${secId}${rowId}`];
    this.setState({competencyDataSource: this._ds.cloneWithRows(this.records)});
  }

  renderCompetency(rowData) {
    return (
      <View style={styles.inputListMemberElements}>
        <View style={styles.inputListElements}>
          <Text style={styles.formListLabel}>Competency: </Text>
          <FormInput
            style={styles.competencyInput}
            placeholder='Enter competency detail'
            underlineColorAndroid='#397af8'
            value={rowData.competency || ''}
            onChangeText={this.onCompetencyChange.bind(this, rowData.rowId)}/>
        </View>
      </View>
    );
  }

  renderHiddenRow(data, secId, rowId, rowMap) {
    return (
      <TouchableOpacity onPress={() => this.deleteRow(secId, rowId, rowMap)} style={styles.rowBack}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const roleNameLabelColor = this.state.mandateField ? 'red' : '#2A2A2A';
    const roleNameLabelStyle = StyleSheet.flatten([styles.formLabel, { color: roleNameLabelColor }]);
    return (
      <View style={styles.container}>
        <View style={styles.headerElements}>
          <Text style={styles.headerLabel}>Add a new role</Text>
        </View>
        <View style={styles.headerCloseIcon}>
          <Button
            buttonStyle={styles.closeIcon}
            onPress={ this.closePopup }
            large
            backgroundColor='transparent'
            color='#397af8'
            icon= {{name: 'clear', color:'#397af8'}}
            underlayColor='#fff'
          />
        </View>
        <View style={styles.inputElements}>
            <Text style={roleNameLabelStyle}>Role Name: </Text>
            <FormInput
              placeholder='Enter role name'
              underlineColorAndroid='#397af8'
              value={this.state.roleName}
              onChangeText={this.onChangeName}
              inputStyle={styles.formInputStyles}/>
        </View>
        <View style={styles.inputElements}>
          <Button
            onPress={ this.addCompetencies }
            backgroundColor='transparent'
            color='#397af8'
            icon= {{name: 'add', color:'#397af8'}}
            underlayColor='#fff'
            title='Add Competencies'
          />
        </View>
        <View style={styles.memberContainer}>
          <SwipeListView
            dataSource={this.state.competencyDataSource}
            renderRow={this.renderCompetency}
            renderHiddenRow={this.renderHiddenRow}
            leftOpenValue={70}
            swipeToOpenPercent={40}
            disableLeftSwipe={true}
            disableRightSwipe={this.records.length === 1}
            recalculateHiddenLayout={false}
            previewFirstRow={true}
            tension={0}
            previewOpenValue={20}/>
        </View>
        <Button
          onPress={ this.addRole }
          backgroundColor='#397af8'
          underlayColor='#fff'
          raised={true}
          title='Create role'
          buttonStyle={styles.createButton}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 10
  },
  headerElements: {
    alignItems: 'center'
  },
  headerLabel: {
    color: "#2a2a2a",
    fontSize: 17,
  },
  headerCloseIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 60
  },
  closeIcon: {
    position: 'absolute',
    marginTop: -45
  },
  inputElements: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row'
  },
  formLabel: {
    color: "#2a2a2a",
    marginTop: 14,
    margin: 0,
    padding: 0
  },
  formInputStyles:{
    color: "#2a2a2a"
  },
  memberContainer: {
    flex:1,
    alignItems: 'center'
  },
  inputListElements: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row'
  },
  inputListMemberElements:  {
    flexDirection: 'column',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#d0d0d0',
    width: 300,
    backgroundColor: "#fafafa"
  },
  formListLabel: {
    width: 100,
    color: "#2a2a2a",
    textAlign: 'right',
    marginTop: 10,
    padding: 0
  },
  competencyInput: {
    width: 200,
    height: 40,
    paddingLeft: 5
  },
  createButton: {
    margin: 10,
    height: 30
  },
  rowBack: {
    backgroundColor: "#dd4116",
    justifyContent: 'center',
    height: 60,
    padding: 10
  },
  remove: {
    fontWeight: 'bold',
    color: "#efefef"
  }
});
