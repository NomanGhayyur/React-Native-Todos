import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import List from "./app/screens/List";
import Details from "./app/screens/Details";

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="My Todos" component={List} />
        <stack.Screen name="Details" component={Details} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
