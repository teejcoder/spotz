import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

let locationOfInterest = [
  {
    title: 'First Marker',
    location: {
      latitude: -37.8136,
      longitude: 144.9631,
    },
    description: 'First Marker'
  },
  {
    title: 'Second Marker',
    location: {
      latitude: -37.8003,
      longitude: 144.9669,
    },
    description: 'Second Marker'
  }
]

export default function Map() {
  const [draggableMarker, setDraggableMarker] = useState({
    latitude: -37.8120,
    longitude: 144.9620
  });

  const dropPinOnSpot = (region) => {

    return (
      setDraggableMarker(region)
      //place pin
  
      //take a picture/ upload a picture of the spot
  
      //add notes about the spot in description
  
      //place marker with notes
  
      //drop pin and save to DB
    );
  }

  const showLocationOfInterest = () => {
    return locationOfInterest.map((item, index) => {
      return (
        <Marker 
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      )
    })
  };


  // //USER LOCATION FOR PRECISE LOCATION
  // const userLocation = async () => {
  //   let {status} = await Location.requestForegroundPermissionsAsync();
  //   if (!status){
  //     setErrorMsg('Permission to access your Location denied by User');
  //   }
  //   let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true });
  //   setMapRegion({
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   });
  //   console.log(location.coords.latitude, location.coords.longitude);
  // }

  // useEffect(() => {
  //   userLocation();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
        style={styles.map} 
        onRegionChange={dropPinOnSpot}
        initialRegion={{
            latitude: -37.8136,
            latitudeDelta: 0.0922,
            longitude: 144.9631,
            longitudeDelta: 0.0144,
        }}
      >
        {showLocationOfInterest()}
        <Marker 
          draggable
          pinColor='#0000ff'
          coordinate={draggableMarker} 
          onDragEnd={(e) => setDraggableMarker(e.nativeEvent.coordinate)}
        />
      </MapView>

      <View style={styles.buttonContainer}>

      {/* <Pressable onPress={userLocation}>
          <Text>
            Get Location
          </Text>
        </Pressable> */}

        <Button title='Drop Pin' onPress={dropPinOnSpot} />

        <Pressable style={styles.pressable} onPress={() => router.push("/")}>
          <Text>
            Back
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  getLocationPressable: {
    width: '40%',
    padding: 15,
    margin: 5,
    backgroundColor: '#B3E6B5',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '80%',
  },
  buttonStyles: {
    width: '40%',
    padding: 15,
    margin: 5,
    backgroundColor: '#E6BAAC',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }

  // mapComponent: {
  //   flex: 1,
  //   display: 'flex',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   margin: 'auto',
  // },
});