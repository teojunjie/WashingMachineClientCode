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
      machineInfo = response;
      console.log(machineInfo);
      this.updateMachineUI(machineInfo);
    })
    initialMachinesArr = [
      {
        id: 1,
        machineBackgroundColor: "red",
        machineStatus: "OFF",
        text : "Machine 1"
      },
      
      {
        id: 2,
        machineBackgroundColor: "red",
        machineStatus: "OFF",
        text : "Machine 2"
      },
      
      {
        id: 3,
        machineBackgroundColor: "red",
        machineStatus: "OFF",
        text : "Machine 3"
      },
      
      {
        id: 4,
        machineBackgroundColor: "red",
        machineStatus: "OFF",
        text : "Machine 4"
      },

      {
        id: 5,
        machineBackgroundColor: "red",
        machineStatus: "OFF",
        text : "Machine 5"
      }
    ];

    var machinesListArr = initialMachinesArr.map(machineInfo => (
      <TouchableHighlight key={machineInfo.id} style= {styles.machinesContainer} onPress= {this.updateMachineUI.bind(this, machineInfo)}>
        <WashingMachine number = {machineInfo.id}/>
      </TouchableHighlight>  
    ));


    this.state = {
      defaultStatus : {
        machineStatus: 'OFF',
        machineBackgroundColor: 'red'        
      },
      machines : initialMachinesArr,
      machinesListArr : machinesListArr
    }


  }


  updateMachineUI(machineInfo) {
    console.log('Clicked');

    console.log(machineInfo);
    var machineNumber = machineInfo.id;
    var machineStatus = machineInfo.machineStatus;
    var machineBackgroundColor = machineInfo.machineBackgroundColor;

    var updatedMachinesInfo = this.state.machines;
    var machinesListArr = this.state.machinesListArr;
    console.log('Before');
    console.log(updatedMachinesInfo); 
    updatedMachinesInfo[machineNumber-1].machineStatus = machineStatus;
    updatedMachinesInfo[machineNumber-1].machineBackgroundColor = machineBackgroundColor;

    var newMachineStatus = updatedMachinesInfo[machineNumber-1].machineStatus;
    var newMachineBackgroundColor = updatedMachinesInfo[machineNumber-1].machineBackgroundColor;

    this.setState({machines : updatedMachinesInfo});
    console.log('After');
    console.log(this.state);

    updateMachine(machineNumber, newMachineStatus, newMachineBackgroundColor, machinesListArr);
  }

  render() {
    console.log('Rendering...');
    console.log(this.state);

    return (
      <ScrollView style= {styles.scrollContainer}>
        {this.state.machinesListArr}
      </ScrollView>
    )
  }
}

function updateMachine(machineNumber, machineStatus, machineBackgroundColor, machinesListArr) {

    console.log('Updating washing machine ui for ' + machineNumber );
    console.log(machinesListArr[machineNumber-1]);
    machinesListArr[machineNumber-1].props.updateMachineState(machineStatus, machineBackgroundColor);
    console.log('View status');
    console.log(this.state);

}

function updateMachineState(machineStatus, machineBackgroundColor) {
    this.setState({machineStatus: machineStatus,
                   machineBackgroundColor : machineBackgroundColor})
}


class WashingMachine extends Component {
  constructor() {
    super()
    this.state = {
      machineStatus: 'OFF',
      machineBackgroundColor: 'red'
    }
    updateMachineState = updateMachineState.bind(this);    
  }

  render() {
    var washingMachineName = "Washing Machine " + this.props.number;
    return (

        <View style={[styles.machine, {backgroundColor: this.state.machineBackgroundColor}]}>
            <Text style={styles.name}>{washingMachineName}</Text>
            <Text style={styles.status}> {this.state.machineStatus}</Text>        
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
  Blocks: {screen : BlocksScreen},
  Settings: {screen : SettingsScreen} 
}, {
    defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Blocks') {
        iconName = 'ios-navigate'
      } else if (routeName === 'Settings') {
        iconName = 'ios-options';
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  initialRouteName: 'Blocks',
  activeColor: '#f0edf6',
  inactiveColor : '#3e2465',
  barStyle : {
    backgroundColor : '#694fad'
  }
})


const styles = StyleSheet.create({
  scrollContainer: {
    flex : 1
  },
  machinesContainer : {
    flex : 1,
    flexDirection : 'row',
    flexWrap:'wrap',
    padding : 2,
    justifyContent : 'space-around',

  },
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    margin : 5
  },
  machine : {
    height : 200,
    width : Dimensions.get('window').width/2 -12,
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
