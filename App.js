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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
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
        <TouchableHighlight onPress={this.onClick.bind(this)}>
          <View style={[styles.machine, {backgroundColor: this.state.machineBackgroundColor}]}>
              <Text style={styles.name}>Washing Machine 1</Text>
              <Text style={styles.status}> {this.state.washingMachineStatus}</Text>        
          </View>
         </TouchableHighlight> 
      </View>
    );
  }
}

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
