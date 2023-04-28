import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen.js';
import ShowScreen from './screens/ShowScreen.js';
//import GoodScreen from './GoodScreen';

const Stack = createNativeStackNavigator();

export default function App() {
      
    
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen}/>
        <Stack.Screen name="ShowScreen" component={ShowScreen}/>  
        </Stack.Navigator>
    </NavigationContainer>
  );
}