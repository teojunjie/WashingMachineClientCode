/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import { LOCALHOSTEMULATORURL, SERVERURL } from 'react-native-dotenv'
import { createMaterialTopTabNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';
import GH from './blocks/gh';
import SettingsScreen from './screens/settings';


const tabNavigator = createBottomTabNavigator({
  GH: {screen : GH},
  F: {screen : GH},
  E: {screen : GH},
  CD: {screen : GH},
  AB: {screen : GH},
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




export default createAppContainer(tabNavigator);
