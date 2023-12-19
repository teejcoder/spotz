import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
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
];

export default function Map() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [draggableMarker, setDraggableMarker] = useState({
    latitude: -37.8120,
    longitude: 144.9620,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0144,
  });

  const mapRef = useRef(null);

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
    });
  };


  //USER LOCATION FOR PRECISE LOCATION
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('location permission granted')
      } else {
        setErrorMsg('Permission to access location was denied');
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      console.log('user location:', location)
      setLocation(userLocation);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  let userLatitude = text.latitude
  let userLongitude = text.longitude


  //GO TO USER'S LOCATION
  const goToUserLocation = () => {
    if (location) {
      mapRef.current.animateToRegion({
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0144,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map} 
        showsUserLocation={true}
        onRegionChange={setDraggableMarker}
      >
        {showLocationOfInterest()}
        <Marker 
          draggable
          title='Marker Title'
          description='Marker to place at a new skate spot'
          pinColor='#0000ff'
          coordinate={draggableMarker}
          onDragEnd={(e) => setDraggableMarker(e.nativeEvent.coordinate)}
        />
      </MapView>

      <View style={styles.buttonContainer}>
      <Button title='Location' onPress={goToUserLocation} />
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
  pressable: {
    width: '40%',
    padding: 15,
    margin: 5,
    backgroundColor: '#1AFFD5',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
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