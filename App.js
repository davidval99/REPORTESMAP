import React, { useState, useEffect } from "react";
import MainTabScreen from "./screens/MainTabScreen";

import MarkerFetcher from "./components/MarkerFetcher";
import { firebaseConfig } from "./database/Firebase";
import SupportScreen from "./screens/SupportScreen";
import HomeScreen from "./screens/HomeScreen";
import * as firebase from "firebase/app"; //npm i firebase@7.9.0
import "firebase/firestore";
import { View, ActivityIndicator, Text } from "react-native";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.app();

const Drawer = createDrawerNavigator();

export default function App() {
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const [listReports, setListReports] = useState([]);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    let list = [];
    const response = await db.firestore().collection("report").get();
    let a = 0;
    response.forEach((document) => {
      const id = document.id;
      const {
        itemID,
        Name,
        OBSERVACION,
        OLOR,
        TAMANO,
        TIPO,
        ESTADO,
        Date_Obs,
        Time_Obs,
        LocalLatit,
        LocalLongi,
        V_Prec_Obs: latitudeDelta,
        H_Prec_Obs: longitudeDelta,
      } = document.data();

      if (LocalLatit && LocalLongi && latitudeDelta && longitudeDelta) {
        list.push({
          id,
          itemID,
          Name,
          OBSERVACION,
          OLOR,
          TAMANO,
          TIPO,
          ESTADO,
          Date_Obs,
          Time_Obs,
          LocalLatit,
          LocalLongi,
          latitudeDelta,
          longitudeDelta,
        });
      }
    });
    setListReports(list);
  };

  //return (
  //  <NavigationContainer theme={theme}>
  //    <Drawer.Navigator initialRouteName="Home">
  //      <Drawer.Screen name="Home" component={MainTabScreen} />
  //    </Drawer.Navigator>
  //  </NavigationContainer>
  //);
  //}

  if (listReports.length > 0) {
    return <MarkerFetcher listReports={listReports} />;
  }
  return <Text>CARGANDO</Text>;
}
