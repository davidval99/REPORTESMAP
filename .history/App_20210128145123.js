import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import CrudTest from "./components/CrudTest";
import MarkerFetcher from "./components/MarkerFetcher";
import { firebaseConfig } from "./database/Firebase";
import * as firebase from "firebase/app"; //npm i firebase@7.9.0
import "firebase/firestore";
import { Text } from "react-native";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.app();

export default function App() {
  const [listReports, setListReports] = useState([]);

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    let list = [];
    const response = await db.firestore().collection("report").get();
    let a = 0;
    response.forEach((document) => {
      console.log(a++);
      const id = document.id;
      const {
        LocalLatit,
        LocalLongi,
        V_Prec_Obs: latitudeDelta,
        H_Prec_Obs: longitudeDelta,
      } = document.data();

      if (LocalLatit && LocalLongi && latitudeDelta && longitudeDelta) {
        if (listReports.length > 1) {
          console.log("Hola");
          return;
        }
        list.push({
          id,
          LocalLatit,
          LocalLongi,
          latitudeDelta,
          longitudeDelta,
        });
      }

      list = list.slice(0, 76);
    });
    setListReports(list);
  };

  if (listReports.length > 0) {
    return (
      <MarkerFetcher listReports={listReports} />
      //<>
      // <CrudTest listReports={listReports} />
      // </>
    );
  }
  return <Text>CARGANDO</Text>;
}
