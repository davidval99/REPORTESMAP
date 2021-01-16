import React from "react";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Markers = (props) =>
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

export default Markers;
