import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../contants/colors";
import { useState } from "react";
import ImagePickerComponent from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  
  const [selectedImage,setSelectedImage]=useState();
  const [pickedLocation,setPcikedLocation]=useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  
  const takeImageHandler=()=>{};

  const pickLocationHandler=()=>{};

  const savePlaceHandler=()=>{
     
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePickerComponent onTakeImage={}/>
      <LocationPicker onPickLocation={} />
      <Button whenPressed={savePlaceHandler} >Add Place</Button>
    </ScrollView>
  );
}

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

export default PlaceForm;
