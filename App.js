import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import {Colors} from './contants/colors'
import Map from "./screens/Map";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor: Colors.primary500},
          headerTintColor:Colors.gray700,
          cardStyle:{backgroundColor:Colors.gray700}

        }} >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
            title: 'Your Favourite Places',
             headerRight: ({tintColor})=><IconButton icon={'add'} color={tintColor} size={24} whenPressed={()=>navigation.navigate('AddPlace')} />
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{ title:'Add a New Place',
          }}/>
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
