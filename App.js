/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { LOCALHOSTEMULATORURL, SERVERURL } from 'react-native-dotenv'
import { createMaterialTopTabNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation'


class BlocksScreen extends Component {
    constructor(){
    super();
    this.socket = io(SERVERURL);
    this.socket.on('machineStatus',(response)=>{
      console.log('Data received from server ');
      this.updateMachineUI();
    })
    this.state = {
      washingMachineStatus: 'OFF',
      machineBackgroundColor: 'red'
    }
  }

  updateMachineUI = () => {
    console.log('Updating washing machine ui');
    this.setState({washingMachineStatus: 'ON',
                   machineBackgroundColor : 'green'})
  }


  onClick() {
    console.log('Clicked');
    this.updateMachineUI();
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.machine, {backgroundColor: this.state.machineBackgroundColor}]}>
              <Text style={styles.name}>Washing Machine 1</Text>
              <Text style={styles.status}> {this.state.washingMachineStatus}</Text>        
          </View>
      </View>
    );
  }
}


class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
      )
  }
}

const tabNavigator = createBottomTabNavigator({
  Blocks: {screen : BlocksScreen},
  Settings: {screen : SettingsScreen} 
}, {
  initialRouteName: 'Blocks',
  activeColor: '#f0edf6',
  inactiveColor : '#3e2465',
  barStyle : {
    backgroundColor : '#694fad'
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cecece',
  },
  machine : {
    height : 250,
    width : 250,
    justifyContent: 'center',
    alignItems :'center',
    borderRadius: 10,
    padding : 10,
    margin : 20,
    backgroundColor : 'red'
  },
  name: {
    flex: 1,
    fontSize: 25,
    color : 'black',
    justifyContent: 'center',
    textAlign:'center',
    alignItems :'center',
    paddingTop : 10
  },
  status: {
    flex: 5,
    textAlignVertical:'center',
    textAlign:'center',
    fontSize : 30
  }
});

export default createAppContainer(tabNavigator);
