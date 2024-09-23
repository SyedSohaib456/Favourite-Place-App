import { View, StyleSheet, Alert, Image, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../contants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

function LocationPicker() {
  const route = useRoute();

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const [pickedLocation, setPickedLocation] = useState();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  
  }, [route, isFocused]);

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    let permissionResponse = await requestPermission();

    if (permissionResponse.status === PermissionStatus.UNDETERMINED) {
      permissionResponse = await requestPermission();
    }

    if (permissionResponse.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this feature."
      );
      return false;
    }

    if (permissionResponse.status !== PermissionStatus.GRANTED) {
      const finalResponse = await requestPermission();
      return finalResponse.status === PermissionStatus.GRANTED;
    }

    return true;
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No location picked yet!</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lat) }}
        resizeMode="cover"
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" whenPressed={getLocationHandler}>
          Current Location
        </OutlinedButton>
        <OutlinedButton icon="map" whenPressed={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
