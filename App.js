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
    this.socket = io('https://192.168.43.152:3000');


  }
  render() {

  console.log('Sending get request');
  fetch('https://192.168.1.1:3000/')  
    .then(function(response) {
      console.log('Received response');
      return response.json()
    }).catch((error)=> {
      console.log(error);
    })

    // fetch('http://192.168.43.152:3000/machineStatus', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     machineName: 'yourValue',
    //     machineStatus: 'yourOtherValue',
    //   }),
    // }).then(function(response) {
    //   console.log('Waiting for fetch response');
    //   return response.json();

    // });
    console.log('Test log')
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>GH Washing Machine</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'left',
    margin : 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
