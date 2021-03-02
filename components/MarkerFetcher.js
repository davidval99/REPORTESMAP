import React, { useState, useEffect, useRef } from "react";
import { firebase } from "../database/config";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Animated,
} from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.98;
const imageHeight = 300;

export default function MarkerFetcher({ params }) {
  const initialMapState = {
    Date_Obs: "Selecciona un marcador",
    ESTADO: "Selecciona un marcador",
    LocalLatit: "9.93066400000",
    LocalLongi: "-84.02592500000",
    Name: "",
    OBSERVACION: "Selecciona un marcador",
    OLOR: "Selecciona un marcador",
    TAMANO: "Selecciona un marcador",
    TIPO: "Selecciona un marcador",
    Time_Obs: "Selecciona un marcador",
    id: -1,
    itemID: "",
    latitudeDelta: "0.04865200000",
    longitudeDelta: "0.03012500000",
  };
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const [listReports, setListReports] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(initialMapState);
  const [loading, setLoading] = useState(true);
  const _onLoadEnd = () => {
    setLoading(false);
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    getReports();
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= listReports.length) {
        index = listReports.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = listReports[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: parseFloat(initialMapState.latitudeDelta),
              longitudeDelta: parseFloat(initialMapState.longitudeDelta),
            },
            350
          );
        }
      }, 10);
    });
  }, []);

  const getReports = () => {
    firebase
      .firestore()
      .collection("report")
      .get()
      .then((response) => {
        let list = [];
        let imageList = [];
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
            image,
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
              image,
            });
          }
        });
        setListReports(list);
      })
      .catch((err) => {
        console.log("ERROR");
      });
  };

  if (listReports.length === 0) {
    return (
      <View style={[styles.container1, styles.horizontal1]}>
        <ActivityIndicator size="large" color="#0066b0" />
      </View>
    );
  }

  const interpolations = listReports.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

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
        ref={_map}
        style={StyleSheet.absoluteFillObject}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: parseFloat(initialMapState.LocalLatit),
          longitude: parseFloat(initialMapState.LocalLongi),
          latitudeDelta: parseFloat(initialMapState.latitudeDelta),
          longitudeDelta: parseFloat(initialMapState.longitudeDelta),
        }}
      >
        {listReports.map((report, i) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[i].scale,
              },
            ],
          };
          return (
            <Marker
              ref={_map}
              coordinate={{
                latitude: parseFloat(report.LocalLatit),
                longitude: parseFloat(report.LocalLongi),
                latitudeDelta: parseFloat(report.latitudeDelta),
                longitudeDelta: parseFloat(report.longitudeDelta),
              }}
              onPress={() => setCurrentMarker(report)}
              key={report.itemID}
            >
              <Callout tooltip></Callout>
            </Marker>
          );
        })}
      </MapView>
      <StatusBar style="auto" />

      <View style={styles.scrollView}>
        {currentMarker.id == -1 ? (
          <View></View>
        ) : (
          <View style={styles.card}>
            <View style={styles.textContent}>
              <Text style={styles.title}>
                {"Detalles del reporte #" + currentMarker.itemID + ":"}
              </Text>
              <ScrollView>
                <View style={styles.item}>
                  {currentMarker.image == undefined ? (
                    <Text style={styles.cardDescription}>
                      {"No hay imágenes asociadas a este reporte."}
                    </Text>
                  ) : (
                    <View>
                      <Image
                        onLoadEnd={_onLoadEnd}
                        source={{
                          uri: currentMarker.image[0],
                        }}
                        style={{ height: 300, width: 300 }}
                        resizeMode="cover"
                      />
                      <ActivityIndicator
                        size="large"
                        color="#0066b0"
                        animating={loading}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.item}>
                  <Text style={styles.cardDescription}>
                    {"Observación reportada : " + currentMarker.OBSERVACION}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.cardDescription}>
                    {"Estado: " + currentMarker.ESTADO}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.cardDescription}>
                    {"Presenta olor: " + currentMarker.OLOR}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.cardDescription}>
                    {"Clasificación del agua : " + currentMarker.TIPO}
                  </Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.cardDescription}>
                    {"Fecha de reporte: " + currentMarker.Date_Obs}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    margin: 2,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  name: {
    color: "#fff",
    fontSize: 20,
  },

  horizonta1: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
    alignSelf: "center",
    elevation: 2,
    backgroundColor: "#0066B0",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    marginTop: 1,
    fontSize: 15,
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
