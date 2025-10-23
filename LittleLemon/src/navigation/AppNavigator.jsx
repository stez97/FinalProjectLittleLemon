import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import OrderTable from "../screens/OrderTable/OrderTable";
import Animation from "../screens/Splash/Animation";
import OrderConfirmation from "../screens/OrderTable/OrderConfirmation";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { isEmpty } from "../utils/validation";

const Stack = createStackNavigator();
// Common function to handle the navigation of the application.
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Animation" component={Animation} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Order" component={OrderTable} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
