import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  StatusBar,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login, getUser } from "../actions/users";
import { firebase } from "../database/config";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContent } from "./DrawerContent";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: "#ffffff",
    text: "#333333",
  },
};

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: "#333333",
    text: "#ffffff",
  },
};

const theme = CustomDefaultTheme;
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.getUser(user.uid);
        if (this.props.user != null) {
          this.props.navigation.navigate("MainTabScreen");
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0066b0" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Bienvenido!</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: "#404143",
            },
          ]}
        >
          <Text
            style={[
              styles.text_footer,
              {
                color: "#ffff",
              },
            ]}
          >
            Correo Electrónico
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={"#ffff"} size={20} />
            <TextInput
              placeholder="Digite su correo"
              placeholderTextColor="#666666"
              keyboardType={"email-address"}
              style={[
                styles.textInput,
                {
                  color: "#ffff",
                },
              ]}
              autoCapitalize="none"
              value={this.props.user.email}
              onChangeText={(email) => this.props.updateEmail(email)}
            />
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                color: "#ffff",
                marginTop: 35,
              },
            ]}
          >
            Contraseña
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={"#ffff"} size={20} />
            <TextInput
              placeholder="Digite su contraseña"
              placeholderTextColor="#666666"
              secureTextEntry={this.state.hidden}
              style={[
                styles.textInput,
                {
                  color: "#ffff",
                },
              ]}
              autoCapitalize="none"
              value={this.props.user.password}
              onChangeText={(password) => this.props.updatePassword(password)}
            />
            <TouchableOpacity
              onPress={() => this.setState({ hidden: !this.state.hidden })}
            >
              {this.state.hidden ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={{ color: "#0066b0", marginTop: 15 }}>
              Olvidaste la contraseña?
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: "#0066b0",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => this.props.login()}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#FFFF",
                  },
                ]}
              >
                Iniciar Sesión
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signup")}
              style={[
                styles.signIn,
                {
                  borderColor: "#0066b0",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#ffff",
                  },
                ]}
              >
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#ffff",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
