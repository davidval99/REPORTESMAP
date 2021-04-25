import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../database/config";

const AddMarker = (props) => {
  // Icons for multiselect

  const icon = ({ name, size = 18, style }) => {
    let iconName;
    switch (name) {
      case "search":
        iconName = "magnifier";
        break;
      case "keyboard-arrow-up":
        iconName = "arrow-up";
        break;
      case "keyboard-arrow-down":
        iconName = "arrow-down";
        break;
      case "close":
        iconName = "close";
        break;
      case "check":
        iconName = "check";
        break;
      case "cancel":
        iconName = "close";
        break;
      default:
        iconName = null;
        break;
    }
    return <Icon style={style} size={size} name={iconName} />;
  };

  // Items for water types

  const items = [
    // this is the parent or 'item'
    {
      name: "Seleccione 1 o más opciones",
      id: 0,
      // these are the children or 'sub items'
      children: [
        {
          name: "Aguas pluviales: Provenientes de la lluvia.",
          id: 1,
        },
        {
          name:
            "Aguas servidas o negras: Provienen de servicios sanitarios contaminadas con heces y orina.",
          id: 2,
        },
        {
          name:
            "Aguas grises: Provienen del uso doméstico (lavado de utensilios y ropa, baño de las personas, Aguas jabonosas. NO CONTIENEN residuos fecales",
          id: 3,
        },

        {
          name: "Otros: Químicos, tintes, residuos industriales, etc.",
          id: 4,
        },
      ],
    },
  ];

  {
    const initalState = {
      //itemID,
      OBSERVACION: "",
      Direccion: "",
      OLOR: "No",
      TIPO: "",
      Date_Obs: "",
      Time_Obs: "",
      LocalLatit: props.navigation.state.params.region.latitude,
      LocalLongi: props.navigation.state.params.region.longitude,
      image: "",
      V_Prec_Obs: props.navigation.state.params.region.latitudeDelta,
      H_Prec_Obs: props.navigation.state.params.region.longitudeDelta,
    };

    const [tieneOlor, setOlor] = useState("No");
    const [canton, setCanton] = useState("Ninguno");

    const [tiposAgua, setTiposAgua] = useState([]);

    const [state, setState] = useState(initalState);

    const handleChangeText = (value, name) => {
      setState({ ...state, [name]: value });
    };

    //Functions

    const saveNewReport = async () => {
      if (state.OBSERVACION === "") {
        alert("Por favor escriba una descripción.");
      } else if (state.Direccion === "") {
        alert("Por favor escriba una dirección.");
      } else if (idToText() === "") {
        alert("Por favor seleccione 1 o más tipos de agua.");
      } else {
        try {
          await firebase.firestore().collection("report").add({
            LocalLatit: state.LocalLatit,
            LocalLongi: state.LocalLongi,
            V_Prec_Obs: state.V_Prec_Obs,
            H_Prec_Obs: state.H_Prec_Obs,
            OBSERVACION: state.OBSERVACION,
            Direccion: state.Direccion,
            OLOR: tieneOlor,
            TIPO: idToText(),
            Date_Obs: getCurrentDate(),
            Time_Obs: getCurrentTime(),
            Canton: canton,
            User: props.navigation.state.params.user,
          });
        } catch (error) {
          console.log(error);
        }
      }

      alert("Su reporte se guardó exitosamente");
      props.navigation.navigate("MainTabScreen");
    };

    const getCurrentDate = () => {
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      return date + "/" + month + "/" + year; //format: dd/mm/yyyy;
    };

    const getCurrentTime = () => {
      var hour = new Date().getHours();
      var minutes = new Date().getMinutes() + 1;
      var seconds = new Date().getSeconds();

      return hour + ":" + minutes + ":" + seconds;
    };

    const idToText = () => {
      let tipoAguasN = [];
      tiposAgua.map((number) => {
        if (number == 1) {
          tipoAguasN.push("PLUVIALES");
        } else if (number == 2) {
          tipoAguasN.push("SERVIDAS");
        } else if (number == 3) {
          tipoAguasN.push("GRISES");
        } else if (number == 4) {
          tipoAguasN.push("OTROS");
        }
      });
      return tipoAguasN;
    };

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.formText}>
            Descripción detallada del desfogue
          </Text>
          <TextInput
            onChangeText={(value) => handleChangeText(value, "OBSERVACION")}
            value={state.OBSERVACION}
            maxLength={124}
            placeholder={
              "Descripción, detalles importantes, tamaño, cantidad de tubos, etc."
            }
            multiline={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.formText}>Dirección</Text>
          <TextInput
            onChangeText={(value) => handleChangeText(value, "Direccion")}
            value={state.Direccion}
            maxLength={124}
            placeholder={
              "Para ayudar a las autoridades a encontrar el desfogue sea lo más preciso posible."
            }
            multiline={true}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.formText}>Tipo de Agua</Text>
          <SectionedMultiSelect
            items={items}
            IconRenderer={icon}
            uniqueKey="id"
            subKey="children"
            hideSearch={true}
            selectText="Escoger tipo de aguas..."
            showDropDowns={false}
            readOnlyHeadings={true}
            onSelectedItemsChange={setTiposAgua}
            selectedItems={tiposAgua}
          />
        </View>

        <Text style={styles.formText}>¿Presenta Olor?</Text>
        <Picker
          selectedValue={tieneOlor}
          onValueChange={(itemValue, itemIndex) => setOlor(itemValue)}
        >
          <Picker.Item label="NO" value="NO" />
          <Picker.Item label="SI" value="SI" />
        </Picker>

        <Text style={styles.formText}>
          Cantón donde se encuentra el desfogue
        </Text>

        <Picker
          selectedValue={canton}
          onValueChange={(itemValue, itemIndex) => setCanton(itemValue)}
        >
          <Picker.Item label="Abangares" value="Esto es una prueba" />
          <Picker.Item label="Acosta" value="Acosta" />
          <Picker.Item label="Alajuela" value="Alajuela" />
          <Picker.Item label="Alajuelita" value="Alajuelita" />
          <Picker.Item label="Alvarado" value="Alvarado" />
          <Picker.Item label="Aserrí" value="Aserrí" />
          <Picker.Item label="Atenas" value="Atenas" />
          <Picker.Item label="Bagaces" value="Bagaces" />
          <Picker.Item label="Barva" value="Barva" />
          <Picker.Item label="Belén" value="Belén" />
          <Picker.Item label="Buenos Aires" value="Buenos Aires" />
          <Picker.Item label="Cañas" value="Cañas" />
          <Picker.Item label="Carrillo" value="Carrillo" />
          <Picker.Item label="Cartago" value="Cartago" />
          <Picker.Item label="Corredores" value="Corredores" />
          <Picker.Item label="Coto Brus" value="Coto Brus" />
          <Picker.Item label="Curridabat" value="Curridabat" />
          <Picker.Item label="Desamparados" value="Desamparados" />
          <Picker.Item label="Dota" value="Dota" />
          <Picker.Item label="El Guarco" value="El Guarco" />
          <Picker.Item label="Escazú" value="Escazú" />
          <Picker.Item label="Esparza" value="Esparza" />
          <Picker.Item label="Flores" value="Flores" />
          <Picker.Item label="Garabito" value="Garabito" />
          <Picker.Item label="Goicoechea" value="Goicoechea" />
          <Picker.Item label="Golfito" value="Golfito" />
          <Picker.Item label="Grecia" value="Grecia" />
          <Picker.Item label="Guácimo" value="Guácimo" />
          <Picker.Item label="Guatuso" value="Guatuso" />
          <Picker.Item label="Heredia" value="Heredia" />
          <Picker.Item label="Hojancha" value="Hojancha" />
          <Picker.Item label="Jiménez" value="Jiménez" />
          <Picker.Item label="LaCruz" value="LaCruz" />
          <Picker.Item label="LaUnión" value="LaUnión" />
          <Picker.Item label="LeónCortés" value="LeónCortés" />
          <Picker.Item label="Liberia" value="Liberia" />
          <Picker.Item label="Limón" value="Limón" />
          <Picker.Item label="Los Chiles" value="Los Chiles" />
          <Picker.Item label="Matina" value="Matina" />
          <Picker.Item label="Montes de Oca" value="Montes de Oca" />
          <Picker.Item label="Montes de Oro" value="Montes de Oro" />
          <Picker.Item label="Mora" value="Mora" />
          <Picker.Item label="Moravia" value="Moravia" />
          <Picker.Item label="Nandayure" value="Nandayure" />
          <Picker.Item label="Naranjo" value="Naranjo" />
          <Picker.Item label="Nicoya" value="Nicoya" />
          <Picker.Item label="Oreamuno" value="Oreamuno" />
          <Picker.Item label="Orotina" value="Orotina" />
          <Picker.Item label="Osa Puntarenas" value="Osa Puntarenas" />
          <Picker.Item label="Palmares" value="Palmares" />
          <Picker.Item label="Paraíso" value="Paraíso" />
          <Picker.Item label="Parrita" value="Parrita" />
          <Picker.Item label="Pérez Zeledón" value="Pérez Zeledón" />
          <Picker.Item label="Poás" value="Poás" />
          <Picker.Item label="Pococí" value="Pococí" />
          <Picker.Item label="Puntarenas" value="Puntarenas" />
          <Picker.Item label="Puriscal" value="Puriscal" />
          <Picker.Item label="Quepos" value="Quepos" />
          <Picker.Item label="Río Cuarto" value="Río Cuarto" />
          <Picker.Item label="San Carlos" value="San Carlos" />
          <Picker.Item label="San Isidro" value="San Isidro" />
          <Picker.Item label="San Ramón" value="San Ramón" />
          <Picker.Item label="San José" value="San José" />
          <Picker.Item label="San Mateo" value="San Mateo" />
          <Picker.Item label="San Pablo" value="San Pablo" />
          <Picker.Item label="San Rafael" value="San Rafael" />
          <Picker.Item label="Santa" value="Santa" />
          <Picker.Item label="Santa Cruz" value="Santa Cruz" />
          <Picker.Item label="Santa Ana" value="Santa Ana" />
          <Picker.Item label="Santo Domingo" value="Santo Domingo" />
          <Picker.Item label="Sarapiquí" value="Sarapiquí" />
          <Picker.Item label="Sarchí" value="Sarchí" />
          <Picker.Item label="Siquirres" value="Siquirres" />
          <Picker.Item label="Talamanca" value="Talamanca" />
          <Picker.Item label="Tarrazú" value="Tarrazú" />
          <Picker.Item label="Tibás" value="Tibás" />
          <Picker.Item label="Tilarán" value="Tilarán" />
          <Picker.Item label="Turrialba" value="Turrialba" />
          <Picker.Item label="Turrubares" value="Turrubares" />
          <Picker.Item label="Upala" value="Upala" />
          <Picker.Item
            label="Vázquez de Coronado"
            value="Vázquez de Coronado"
          />
          <Picker.Item label="Zarcero" value="Zarcero" />
        </Picker>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#0066b0", //boton
                borderWidth: 2,
                marginTop: 35,
              },
            ]}
            onPress={() =>
              Alert.alert(
                "¿Está seguro que desea enviar este reporte?",
                "",
                [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Confirmar",
                    onPress: () => saveNewReport(),
                  },
                ],
                { cancelable: false }
              )
            }
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#000000",
                },
              ]}
            >
              Enviar Reporte
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#0066b0", //boton
                borderWidth: 2,
                marginTop: 35,
              },
            ]}
            onPress={() => props.navigation.navigate("MainTabScreen")}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#000000",
                },
              ]}
            >
              Cancelar y volver
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
};

export default AddMarker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  inputGroup: {
    flex: 1,
    paddingTop: 8,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  formText: {
    paddingBottom: 5,
    fontSize: 18,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    width: 200,
    borderBottomWidth: 1,
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
