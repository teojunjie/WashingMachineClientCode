import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import WashingMachine from '../components/washingmachine';
import { LOCALHOSTEMULATORURL, SERVERURL } from 'react-native-dotenv'
import io from 'socket.io-client/dist/socket.io';
import styles from '../styles/styles';

class GH extends Component {
    constructor(){
    super();
    this.socket = io(LOCALHOSTEMULATORURL);
    this.socket.on('machineStatus',(response)=>{
      console.log('Data received from server ');
      console.log(response);
      this.updateMachineUI(response);
    })

    fetch(LOCALHOSTEMULATORURL +'/getBlockWashingMachines', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        block : 'GH'
      })
    }).then(response => {
          return response.json();
    }).then(responseData => {
          return responseData;
    }).then(data => {
        this.setState({
          machines : data
        })
    }).catch(error => {
      console.log(error);
    });

    initialMachinesArr = [{}]
    this.state = {
      defaultStatus : {
        machineStatus: 'Unavailable',
        machineBackgroundColor: 'red'        
      },
      machines : initialMachinesArr
    }
  }

  updateMachineUI(machineInfo) {
    var machineNumber = machineInfo.machineId;
    var machineStatus = machineInfo.machineStatus;
    var machineBackgroundColor = machineInfo.machineBackgroundColor;

    var updatedMachinesInfo = this.state.machines;
    updatedMachinesInfo[machineNumber-1].machineStatus = machineStatus;
    updatedMachinesInfo[machineNumber-1].machineBackgroundColor = machineBackgroundColor;

    this.setState({machines : updatedMachinesInfo});
  }

  render() {
    console.log('Rendering...');
    var machines = this.state.machines;
    if (Object.keys(machines).length > 1) {
        var machinesListArr = this.state.machines.map(machineInfo => (
            <WashingMachine key={machineInfo.machineId} number = {machineInfo.machineId} machineBackgroundColor = {machineInfo.machineBackgroundColor} machineStatus = {machineInfo.machineStatus} />
        ));

      return (
        <ScrollView style= {styles.scrollContainer}>
          <View style = {styles.machinesContainer}>
              {machinesListArr}
          </View>    
        </ScrollView>
      )

    } else {
      return null;
    }
  }
}

export default GH;