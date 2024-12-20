import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen"; // Ensure you have this screen
import DetailsScreen from "../screens/DetailsScreen"; // Ensure you have this screen
import SearchScreen from "../screens/SearchScreen"; // Ensure you have this screen

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: "About the Movie",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "",
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
