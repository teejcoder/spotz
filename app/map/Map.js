import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';


// EXAMPLE MARKERS
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

// MAP COMPONENT
export default function Map() {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [draggableMarker, setDraggableMarker] = useState({
    latitude: -37.8120,
    longitude: 144.9620,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = useRef(null);

  //RENDER EXAMPLE MARKERS
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
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if ( status !== 'granted') {
        console.log('Please grant location permission')
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      console.log('location', currentLocation.coords)
    };

    getPermissions();
  }, []);


  //FUNCTION FOR BUTTON TO GO TO USER'S LOCATION
  const goToUserLocation = () => {
    if (location) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
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
        initialRegion={location}
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