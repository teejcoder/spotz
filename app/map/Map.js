import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Link } from 'expo-router'

export default class Map extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Link style={styles.touchableOpacity} href="/">
          <Text style={styles.touchableOpacityText}>
            Back
          </Text>
        </Link>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  touchableOpacity: {
    width: 250,
    height: 50,
    borderWidth: 2, // Border width
    borderColor: '#000', // Border color
    borderRadius: 10, // Border radius (adjust as needed)
    backgroundColor: '#FFC0CB'
  },
  touchableOpacityText: {
    textAlign: 'center', // Center text horizontally
    lineHeight: 45,
  },
  // mapComponent: {
  //   flex: 1,
  //   display: 'flex',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   margin: 'auto',
  // },
});