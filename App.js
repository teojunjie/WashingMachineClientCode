/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import io from 'socket.io-client/dist/socket.io';
import { LOCALHOSTEMULATORURL, SERVERURL } from 'react-native-dotenv'
import { createMaterialTopTabNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';

class BlocksScreen extends Component {
    constructor(){
    super();
    this.socket = io(LOCALHOSTEMULATORURL);
    this.socket.on('machineStatus',(response)=>{
      console.log('Data received from server ');
      this.updateMachineUI(response);
    })
    initialMachinesArr = [
      {
        id: 1,
        machineBackgroundColor: "red",
        machineStatus: "Unavailable",
        text : "Machine 1"
      },
      
      {
        id: 2,
        machineBackgroundColor: "red",
        machineStatus: "Unavailable",
        text : "Machine 2"
      },
      
      {
        id: 3,
        machineBackgroundColor: "red",
        machineStatus: "Unavailable",
        text : "Machine 3"
      },
      
      {
        id: 4,
        machineBackgroundColor: "red",
        machineStatus: "Unavailable",
        text : "Machine 4"
      },

      {
        id: 5,
        machineBackgroundColor: "red",
        machineStatus: "Unavailable",
        text : "Machine 5"
      }
    ];

    this.state = {
      defaultStatus : {
        machineStatus: 'Unavailable',
        machineBackgroundColor: 'red'        
      },
      machines : initialMachinesArr
    }

  }


  updateMachineUI(machineInfo) {
    var machineNumber = machineInfo.id;
    var machineStatus = machineInfo.machineStatus;
    var machineBackgroundColor = machineInfo.machineBackgroundColor;

    var updatedMachinesInfo = this.state.machines;
    updatedMachinesInfo[machineNumber-1].machineStatus = machineStatus;
    updatedMachinesInfo[machineNumber-1].machineBackgroundColor = machineBackgroundColor;

    this.setState({machines : updatedMachinesInfo});
  }

  render() {
    console.log('Rendering...');

    var machinesListArr = initialMachinesArr.map(machineInfo => (
        <WashingMachine key={machineInfo.id} number = {machineInfo.id} machineBackgroundColor = {machineInfo.machineBackgroundColor} machineStatus = {machineInfo.machineStatus} />
    ));

    return (
      <ScrollView style= {styles.scrollContainer}>
        <View style = {styles.machinesContainer}>
            {machinesListArr}
        </View>    
      </ScrollView>
    )
  }
}


class WashingMachine extends Component {
  render() {
    var name = "Washing Machine " + this.props.number;
    var machineBackgroundColor = this.props.machineBackgroundColor;
    var machineStatus = this.props.machineStatus;

    return (
        <View style={[styles.machine, {backgroundColor: machineBackgroundColor}]}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.status}> {machineStatus}</Text>        
        </View>
    )
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
  GH: {screen : BlocksScreen},
  F: {screen : BlocksScreen},
  E: {screen : BlocksScreen},
  CD: {screen : BlocksScreen},
  AB: {screen : BlocksScreen},
  Settings: {screen : SettingsScreen} 
}, {
    defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'AB' :
            iconName = 'ios-pizza'
            break;
        case 'CD' :
            iconName = 'ios-nuclear'
            break;
        case 'E' :
            iconName = 'ios-water'
            break;
        case 'F' :
            iconName = 'ios-volume-off'
            break;
        case 'GH' :
            iconName = 'ios-trophy'
            break;
        case 'Settings' :
            iconName = 'ios-settings'
            break;                  
      }
      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  initialRouteName: 'GH',
  activeColor: '#f0edf6',
  inactiveColor : '#3e2465',
  barStyle : {
    backgroundColor : '#694fad'
  }
})


const styles = StyleSheet.create({
  scrollContainer: {
    flex : 1,

  },
  machinesContainer : {
    flex : 1,
    flexDirection : 'row',
    flexWrap:'wrap',
    padding : 2,
    margin : 5,
    justifyContent : 'space-evenly',
  },
  machine : {
    height : 200,
    width : Dimensions.get('window').width/2 -18,
    borderRadius: 10,
    padding : 10,
    margin : 5,
    backgroundColor : 'red'
  },
  name: {
    flex: 1,
    fontSize: 15,
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
    fontSize : 20
  }
});

export default createAppContainer(tabNavigator);
