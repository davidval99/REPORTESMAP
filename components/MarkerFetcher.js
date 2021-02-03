import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from "react-native";

import { firebaseConfig } from "../database/Firebase";
import * as firebase from "firebase/app"; //npm i firebase@7.9.0
import "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 240;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function MarkerFetcher(props) {
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

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
        {props.listReports.map((report, i) => (
          <Marker
            coordinate={{
              latitude: parseFloat(report.LocalLatit),
              longitude: parseFloat(report.LocalLongi),
              latitudeDelta: parseFloat(report.latitudeDelta),
              longitudeDelta: parseFloat(report.longitudeDelta),
            }}
            key={report.itemID}
          >
            <Callout tooltip>
              <View style={styles.card}>
                <Image />
                <View style={styles.textContent}>
                  <Text numberOfLines={5} style={styles.cardDescription}>
                    {"Observación reportada: " + report.OBSERVACION}
                  </Text>
                  <Text numberOfLines={5} style={styles.cardDescription}>
                    {"Descripción: " + report.OBSERVACION}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {"Presenta olor: " + report.OLOR}
                  </Text>
                  <Text numberOfLines={2} style={styles.cardDescription}>
                    {"Clasificación del agua : " + report.TIPO}
                  </Text>
                  <Text numberOfLines={1} style={styles.date}>
                    {"Fecha de reporte: " + report.Date_Obs}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    marginTop: 5,
    fontSize: 12,
    color: "#000000",
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "left",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
