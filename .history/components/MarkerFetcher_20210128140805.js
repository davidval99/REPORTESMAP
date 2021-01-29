import { Component } from "react";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, YellowBox } from "react-native";

import { firebaseConfig } from "../database/Firebase";
import * as firebase from "firebase/app"; //npm i firebase@7.9.0
import "firebase/firestore";

//components

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.app();

export default function MarkerFetcher(props) {
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
        {props.listReports.map((report) => (
          <Marker
            coordinate={{
              latitude: report.LocalLatit,
              longitude: report.LocalLongi,
              latitudeDelta: report.latitudeDelta,
              longitudeDelta: report.longitudeDelta,
            }}
            title={"XX"}
            description={"BBB"}
          ></Marker>
        ))}
        ;
      </MapView>
      <Text>BBB</Text>
      <StatusBar style="auto" />
    </View>
  );
}
