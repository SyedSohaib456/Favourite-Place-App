import PlacesList from "../components/Place/PlacesList"
import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {

  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
