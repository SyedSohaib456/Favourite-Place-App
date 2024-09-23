import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Colors } from "../../contants/colors"; // Fix the import path
import { useState } from "react";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = (location) => {
    setPickedLocation(location);
  };

  const savePlaceHandler = async () => {
   
    console.log("Location:", pickedLocation);

    // if (!enteredTitle || !selectedImage || !pickedLocation || !pickedLocation.lat || !pickedLocation.lng) {
    //   Alert.alert('Invalid input!', 'Please provide a title, image, and location.');
    //   return;
    // }

    const placeData = {
      title: enteredTitle,
      imageUri: selectedImage,
      location: {
        lat: pickedLocation.lat,
        lng: pickedLocation.lng,
      },
      id: new Date().toString() + Math.random().toString(),
    };

    try {
      await onCreatePlace(placeData);
    } catch (error) {
      console.error("Error saving place:", error);
      Alert.alert(
        "An error occurred!",
        "Could not save the place. Please try again."
      );
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button whenPressed={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
