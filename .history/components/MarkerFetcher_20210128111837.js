import { Component } from "react";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { render } from "react-dom";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, YellowBox } from "react-native";

import { firebaseConfig } from "../database/Firebase";
import * as firebase from "firebase/app"; //npm i firebase@7.9.0
import "firebase/firestore";
import Markers from "./Markers";

//components
import ItemReport from "./ItemReport";
YellowBox.ignoreWarnings(["Setting X timer"]); //no deja que muestre el warning

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.app();

export default function MarkerFetcher() {
  const [listReports, setListReports] = useState([]);
  const [LocalLatit, setLatitude] = useState("");
  const [LocalLongi, setLongitude] = useState("");
  const [id, setId] = useState("");
  const [bandera, setBandera] = useState(true);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    let list = [];
    const response = await db.firestore().collection("report").get();
    response.forEach((document) => {
      let id = document.id;
      let LocalLatit = document.data().LocalLatit;
      let LocalLongi = document.data().LocalLongi;
      let obj = { id, LocalLatit, LocalLongi };
      list.push(obj);
    });

    setListReports(list);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={MapView.PROVIDER_GOOGLE}
        region={{
          latitude: 9.917415,
          longitude: -84.034018,
          latitudeDelta: 0.05953,
          longitudeDelta: 0.044982,
        }}
      >
        props.data.map((report) => (
        <Marker
          coordinate={{
            latitude: report.LocalLatit,
            longitude: report.LocalLongi,
            latitudeDelta: 0.05953,
            longitudeDelta: 0.044982,
          }}
          title={"XX"}
          description={"BBB"}
        ></Marker>
        ));
      </MapView>
      <Text>BBB</Text>
      <StatusBar style="auto" />
    </View>
  );
}
