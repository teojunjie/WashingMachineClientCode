import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import styles from '../styles/styles';

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

export default WashingMachine;