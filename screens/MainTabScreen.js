import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./Profile";
import Icon from "react-native-vector-icons/Ionicons";

import SupportScreen from "./SupportScreen";
import MarkerFetcher from "../components/MarkerFetcher";

const DetailsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

class MainTabScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Mapa"
        barStyle={{ backgroundColor: "#0066b0" }}
      >
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={this.props}
          options={{
            tabBarLabel: "Profile",
            tabBarColor: "#0066b0",
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Mapa"
          component={MarkerFetcher}
          initialParams={this.props}
          options={{
            tabBarLabel: "Mapa",
            tabBarColor: "#000000",
            tabBarIcon: ({ color }) => (
              <Icon name="map" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={ConfigurationStackScreen}
          options={{
            tabBarLabel: "Configuración",
            tabBarColor: "#0066b0",
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default MainTabScreen;

const ProfileStackScreen = () => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#0066b0",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="CBIMA"
      initialParams={this.props.screenProps}
      component={Profile}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#0066b0"
            onPress={() => this.props.navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </DetailsStack.Navigator>
);

const MapStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#0066b0",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="CBIMA"
      component={MarkerFetcher}
      /*options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#0066b0"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}*/
    />
  </DetailsStack.Navigator>
);

const ConfigurationStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#0066b0",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="CBIMA"
      component={SupportScreen}
      /*options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#0066b0"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}*/
    />
  </DetailsStack.Navigator>
);
