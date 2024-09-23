import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Colors } from '../../contants/colors';

function PlaceItem({ place, onSelect }) {
 const latitude = place["location"]["lat"]
 const longitude = place["location"]["lng"]
  return (
    <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onSelect}>
      {place.imageUri ? (
        <Image style={styles.image} source={{ uri: place.imageUri }} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder}>
          <Text>No Image Available</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <View style={{marginTop:5}} >
        <Text style={styles.bold} >Latitude:</Text>
        <Text style={styles.subTitle}>{`${latitude}`}</Text>
        </View>
        <View style={{marginTop:2}} >
        <Text style={styles.bold} >Longitude:</Text>
        <Text style={styles.subTitle}>{`${longitude}`}</Text>
        </View>
      
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight:140,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    padding: 5, 
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    width: '32%', // Fixed width for the image
    height: '100%', // Fixed height for the image
    borderRadius: 4, // Rounded corners
  },
  placeholder: {
    width: 100, // Match the width of the image
    height: 100, // Match the height of the image
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray200,
    borderRadius: 4, // Rounded corners for placeholder
  },
  info: {
    flex: 1,
    paddingLeft: 10, // Space between image and text
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.gray700,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.gray700,
  },
  bold:{
    fontWeight:'bold',
    fontSize:17,
  }
});

export default PlaceItem;
