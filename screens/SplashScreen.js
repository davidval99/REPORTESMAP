import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";

class SplashScreen extends React.Component {
  goToLogin = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0066b0" barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require("../assets/cbimaLogo.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View
          style={[
            styles.footer,
            {
              backgroundColor: "#404143",
            },
          ]}
          animation="fadeInUpBig"
        >
          <Text
            style={[
              styles.title,
              {
                color: "#ffff",
              },
            ]}
          >
            Trabajando en el rescate de la microcuenca del río María Aguilar.
          </Text>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: "#0066b0", //boton
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#FFFF",
                  },
                ]}
              >
                Iniciar
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
