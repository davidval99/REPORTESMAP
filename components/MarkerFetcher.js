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
  Modal,
  Button,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { TouchableRipple } from "react-native-paper";
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height - 200;
const CARD_WIDTH = width * 0.98;

export default function MarkerFetcher(props) {
  const initialMapState = {
    Date_Obs: "Selecciona un marcador",
    LocalLatit: "9.93066400000",
    LocalLongi: "-84.02592500000",
    OBSERVACION: "Selecciona un marcador",
    OLOR: "Selecciona un marcador",
    TIPO: "Selecciona un marcador",
    Time_Obs: "Selecciona un marcador",
    id: -1,
    latitudeDelta: "0.04865200000",
    longitudeDelta: "0.03012500000",
  };
  const _map = React.useRef(null);

  const [listReports, setListReports] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(initialMapState);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState(initialMapState);

  const _onLoadEnd = () => {
    setLoading(false);
  };

  const onChangeValue = (region) => {
    setRegion(region);
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
            OBSERVACION,
            OLOR,
            TIPO,
            Date_Obs,
            Time_Obs,
            LocalLatit,
            LocalLongi,
            image,
            tipos,
            V_Prec_Obs: latitudeDelta,
            H_Prec_Obs: longitudeDelta,
          } = document.data();

          if (LocalLatit && LocalLongi && latitudeDelta && longitudeDelta) {
            list.push({
              id,
              OBSERVACION,
              OLOR,
              TIPO,
              Date_Obs,
              Time_Obs,
              LocalLatit,
              LocalLongi,
              latitudeDelta,
              longitudeDelta,
              image,
              tipos,
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
        onRegionChangeComplete={onChangeValue}
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
              onPress={() => {
                setCurrentMarker(report);
                setModalVisible(true);
              }}
              key={report.id}
            >
              <Callout tooltip></Callout>
            </Marker>
          );
        })}
      </MapView>

      <View
        style={{
          top: "15%",
          left: "90%",
          marginLeft: -24,
          marginTop: -48,
          position: "absolute",
        }}
      >
        <TouchableRipple
          style={styles.roundButton1}
          onPress={() =>
            Alert.alert(
              "¿Agregar un reporte en esta ubicación?",
              "",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Confirmar",
                  onPress: () =>
                    props.route.params.screenProps.rootNavigation.navigate(
                      "AddMarker",
                      {
                        region,
                        user:
                          props.route.params.screenProps.rootNavigation.state
                            .params.userUID,
                      }
                    ),
                },
              ],
              { cancelable: false }
            )
          }
        >
          <View>
            <Icon name="map-marker-plus-outline" color="#FFFFFF" size={30} />
          </View>
        </TouchableRipple>
      </View>

      <View
        style={{
          top: "50%",
          left: "50%",
          marginLeft: -24,
          marginTop: -48,
          position: "absolute",
        }}
      >
        <Image
          style={{ height: 48, width: 48 }}
          source={require("../assets/marker.png")}
        />
      </View>

      <StatusBar style="auto" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.card}>
          <View style={styles.textContent}>
            <Text style={styles.buttonContainer}>
              <TouchableRipple
                style={styles.roundButton1}
                onPress={() => setModalVisible(false)}
              >
                <View>
                  <Icon name="close" color="#FFFFFF" size={30} />
                </View>
              </TouchableRipple>
            </Text>

            <Text style={styles.title}>
              {"Detalles del reporte # " + currentMarker.id + " :"}
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
                  {"Presenta olor: " + currentMarker.OLOR}
                </Text>
              </View>
              <View style={styles.item}>
                {currentMarker.tipos == undefined ? (
                  <Text style={styles.cardDescription}>
                    {"No hay tipo definido para este reporte."}
                  </Text>
                ) : (
                  <View>
                    <Text style={styles.cardDescription}>
                      {"Observación reportada : " +
                        currentMarker.tipos.toString()}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.item}>
                <Text style={styles.cardDescription}>
                  {"Fecha de reporte: " + currentMarker.Date_Obs}
                </Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.cardDescription}>
                  {"Hora de reporte: " + currentMarker.Time_Obs}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  buttonContainer: {
    left: "90%",
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  modal: {
    position: "absolute",
  },

  roundButton1: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    borderRadius: 100,
    backgroundColor: "#0066B0",
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

  centeredView: {
    flex: 1,
    margin: 20,
  },

  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },

  card: {
    position: "relative",
    top: "20%",
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

  marker: {
    width: 30,
    height: 30,
  },
});
