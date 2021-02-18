import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignUp from "./SignUp";
import Login from "./Login";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="Login" component={Login} />
    <RootStack.Screen name="SignUpScreen" component={SignUp} />
  </RootStack.Navigator>
);

export default RootStackScreen;
