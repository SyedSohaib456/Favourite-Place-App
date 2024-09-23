import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";

function Map({navigation}) {
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 37.37,
    longitude: -122.4,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const setLocationHandler =  (events) => {
    const lat = events.nativeEvent.coordinate.latitude;
    const lng = events.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  };
   
  const savePickedLocationHandler= useCallback(()=>{
    if (!selectedLocation) {
        Alert.alert('No location picked!','You have to pick a location (by tapping on the map) first!');
        return;
    }
     
    navigation.navigate('AddPlace',{
        pickedLat:selectedLocation.lat,
        pickedLng:selectedLocation.lng,
    })
    
  },[navigation,selectedLocation])

  useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight:({tintColor})=><IconButton whenPressed={savePickedLocationHandler} color={tintColor} icon={'save'} size={24}/>
    })
  },[navigation,savePickedLocationHandler])

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={setLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
