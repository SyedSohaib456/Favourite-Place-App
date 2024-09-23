import { View, Text, FlatList,StyleSheet} from "react-native";
import PlaceItem from "./PlaceItem";
import {Colors} from '../../contants/colors'
function PlacesList({ places }) {
    if (!places || places.length === 0) {
        return(
            <View style={styles.fallBackCtn} >
                <Text style={styles.fallBackText} >No places added yet - start adding some!</Text>
            </View>
        )
    }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem places={item} />}
    />
  );
}
 
 const styles= StyleSheet.create({
    fallBackCtn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    fallBackText:{
        fontSize:16,
        color:Colors.primary200
    }
 })

export default PlacesList;
