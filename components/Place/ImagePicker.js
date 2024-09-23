import React, { useState } from "react";
import { View, Alert, Text, Image, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../contants/colors";
import OutlinedButton from "../UI/OutlinedButton";
function ImagePicker() {
  const [pickedImage, setPickedImage] = useState(null);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      if (permissionResponse.status === "DENIED") {
        Alert.alert(
          "Insufficient Permissions!",
          "Allow camera to use this app."
        );
      }
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      aspect: [16, 9],
      allowsEditing: true,
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet!</Text>;
  if (pickedImage) {
    imagePreview = <Image
    style={styles.image}
    source={{ uri: mapUrl }}
    resizeMode="cover"
    onError={() => {
      Alert.alert("Failed to load map image.");
    }}
  />
  
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton whenPressed={takeImageHandler} icon="camera">
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow:'hidden'
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImagePicker;
