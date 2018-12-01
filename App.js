/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
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
      this.updateText();
    })
    this.state = {
      washingMachineStatus: 'Machine status : OFF'
    }

  }

  updateText = () => {
    this.setState({washingMachineStatus: 'Machine status : ON'})
  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>GH Washing Machine 1</Text>
        <Text> {this.state.washingMachineStatus}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin : 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
