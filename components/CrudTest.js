import React, { useState, useEffect } from "react";
import {
  YellowBox,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Text,
  TouchableHighlight,
  LogBox,
} from "react-native";

import { firebaseConfig } from "../database/Firebase";
import * as firebase from "firebase/app"; //npm i firebase@7.9.0
import "firebase/firestore";

//components
import ItemReport from "./ItemReport";
YellowBox.ignoreWarnings(["Setting X timer"]); //no deja que muestre el warning

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.app();

export default function CrudTest() {
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

  const guardar = async () => {
    let obj = { LocalLatit, LocalLongi };
    if (bandera) {
      await db.firestore().collection("report").add(obj);
      setLatitude("");
      setLongitude("");
      getReports();
    } else {
      await db.firestore().collection("report").doc(id).set(obj);
      setId("");
      setLatitude("");
      setLongitude("");
      setBandera(true);
      getReports();
    }
  };

  const deleteReport = async (props) => {
    await db.firestore().collection("report").doc(props.id).delete();
    getReports();
  };

  const getReport = async (props) => {
    const response = await db
      .firestore()
      .collection("report")
      .doc(props.id)
      .get();
    setId(response.id);
    setLongitude(response.data().LocalLatit);
    setLatitude(response.data().LocalLongi);
    setBandera(false);
  };

  const renderReport = ({ item }) => (
    <ItemReport
      id={item.id}
      LocalLatit={item.LocalLatit}
      LocalLongi={item.LocalLongi}
      deleteReport={deleteReport}
      getReport={getReport}
    />
  );

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={{ width: 350, height: 30, fontSize: 18, margin: 10 }}
          placeholder="LocalLatit"
          onChangeText={(e) => setLatitude(e)}
          value={LocalLatit}
        />
        <TextInput
          style={{ width: 350, height: 30, fontSize: 18, margin: 10 }}
          placeholder="Longitude"
          onChangeText={(e) => setLongitude(e)}
          value={LocalLongi}
        />

        <TouchableHighlight
          style={{ padding: 12, alignSelf: "center", backgroundColor: "#000" }}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => guardar()}
        >
          <Text style={{ color: "#fff" }}>
            {bandera ? "Guardar" : "Editar"}
          </Text>
        </TouchableHighlight>
      </View>

      <View style={{ marginTop: 35 }}>
        <FlatList
          data={listReports}
          renderItem={renderReport}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
