import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../contants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {

  const showOnMapHandler = () => {
    const { lat, lng } = fetchedPlace.location;
    navigation.navigate('Map', {
      initialLat: lat,
      initialLng: lng,
    });
  };

  const [fetchedPlace, setFetchedPlace] = useState();
  const [loading, setLoading] = useState(true); // State for loading

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadPlaceData = async () => {
      try {
        const place = await fetchPlaceDetails(selectedPlaceId);
        setFetchedPlace(place);
        navigation.setOptions({
          title: place.title,
        });
      } catch (error) {
        console.error("Failed to fetch place details:", error);
        // Optionally, handle error state here
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };
    loadPlaceData();
  }, [selectedPlaceId]);

  if (loading) {
    return (
      <View style={styles.fallbackText}>
        <ActivityIndicator size="large" color={Colors.primary500} />
        <Text>Loading place data...</Text>
      </View>
    );
  }

  const { lat, lng } = fetchedPlace.location;

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationCtn}>
        <View style={styles.addressCtn}>
          <View style={styles.latLng}>
            <Text style={styles.subTitle}>Latitude:</Text>
            <Text style={styles.address}>{lat}</Text>
          </View>
          <View style={styles.latLng}>
            <Text style={styles.subTitle}>Longitude:</Text>
            <Text style={styles.address}>{lng}</Text>
          </View>
        </View>
        <OutlinedButton icon="map" whenPressed={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationCtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressCtn: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
  },
  address: {
    color: Colors.primary400,
    fontWeight: "bold",
    fontSize: 16,
  },
  fallbackText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  latLng: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    width: '100%',
    marginVertical: 3, 
  },
  subTitle: {
    color: Colors.primary500,
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10, 
  },
});

export default PlaceDetails;
