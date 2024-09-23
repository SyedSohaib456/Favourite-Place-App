import PlaceForm from "../components/Place/PlaceForm"
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {

  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;