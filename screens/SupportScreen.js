import React, { useState, useEffect, useRef } from "react";
import { Dimensions, Image } from "react-native";

import {
  Button,
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
const options = ["Apple", "Banana", "Orange"];
const { width, height } = Dimensions.get("screen");
const SupportScreen = () => {
  {
    const initalState = {
      Date_Obs: "Selecciona un marcador",
      ESTADO: "",
      LocalLatit: "",
      LocalLongi: "",
      name: "",
      email: "",
      phone: "",
      OBSERVACION: "",
      OLOR: "",
      TAMANO: "",
      TIPO: "",
      Time_Obs: "",
      id: -1,
      itemID: "",
      latitudeDelta: "",
      longitudeDelta: "",
    };

    const [state, setState] = useState(initalState);
    const [selected, setSelected] = useState();

    const handleChangeText = (value, name) => {
      setState({ ...state, [name]: value });
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{"Acerca de nosotros:"}</Text>

          <Text style={styles.text}>
            {
              "La App para el registro, reporte y atención de desfogues y botaderos en el río María Aguilar y sus afluentes es una herramienta que busca facilitar el trabajo en campo, la coordinación interinstitucional y la participación ciudadana para el abordaje y solución de los problemas de contaminación identificados en 295 puntos de la microcuenca, donde se describen 1236 tuberías que vierten aguas sin tratamiento directo al río y de 266 botaderos ilegales de residuos sólidos. Estos puntos se georreferenciaron utilizando equipo topográfico de alta precisión.   "
            }
          </Text>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: "#0066b0",
              borderBottomWidth: 4,
            }}
          />

          <Text style={styles.title}>{"Colaboradores:"}</Text>

          <View
            style={{
              width: width * 0.9,
              display: "flex",
            }}
          >
            <Image
              source={require("../assets/logos/Logos_App_Desfogues.png")}
              style={{ marginTop: 10, width: "100%", height: 450 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    alignContent: "center",
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "justify",
  },
  title: {
    alignContent: "center",
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: "justify",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
