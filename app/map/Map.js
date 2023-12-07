import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import MapView from 'react-native-maps';
import { router } from 'expo-router'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Map() {
  const [marker, setMarker] = useState('')

    return (
      <SafeAreaView style={styles.container}>
        <MapView style={styles.map} 
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}/>

        <Pressable onPress={() => router.push("/")} style={styles.pressable}>
          <Text>
            Back
          </Text>
        </Pressable>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  pressable: {
    width: '40%',
    padding: 15,
    margin: 5,
    backgroundColor: '#E6BAAC',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacityText: {
    textAlign: 'center', // Center text horizontally
    lineHeight: 45,
  },  
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E6BAAC',
    borderWidth: 1,
  },

  // mapComponent: {
  //   flex: 1,
  //   display: 'flex',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   margin: 'auto',
  // },
});