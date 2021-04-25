import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SplashScreen from "../screens/SplashScreen";
import SignUp from "../screens/SignUp";
import MainTabScreen from "../screens/MainTabScreen";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import AddMarker from "../screens/AddMarker";

const SwitchNavigator = createSwitchNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },

    Login: {
      screen: Login,
    },
    Signup: {
      screen: SignUp,
    },

    Profile: {
      screen: Profile,
    },

    AddMarker: {
      screen: AddMarker,
    },
    MainTabScreen: {
      screen: ({ navigation }) => (
        <MainTabScreen screenProps={{ rootNavigation: navigation }} />
      ),
    },
  },
  {
    initialRouteName: "Splash",
  }
);

export default createAppContainer(SwitchNavigator);
