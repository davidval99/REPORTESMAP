import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, signup } from "../actions/users";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    };
  }
  handleSignUp = () => {
    this.props.signup();
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0066b0" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Registro de usuario</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Text style={styles.text_footer}>Correo Electrónico</Text>
            <View style={styles.action}>
              <FontAwesome name="envelope" color="#FFFF" size={20} />
              <TextInput
                placeholder="Digite su correo"
                style={styles.textInput}
                autoCapitalize="none"
                value={this.props.user.email}
                onChangeText={(email) => this.props.updateEmail(email)}
              />
            </View>

            <Text style={styles.text_footer}>Nombre</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#FFFF" size={20} />
              <TextInput
                placeholder="Digite su nombre"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.text_footer}>Apellido</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#FFFF" size={20} />
              <TextInput
                placeholder="Digite su apellido"
                style={styles.textInput}
                autoCapitalize="none"
              />
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 35,
                },
              ]}
            >
              Contraseña
            </Text>
            <View style={styles.action}>
              <Feather name="lock" color="#FFFF" size={20} />
              <TextInput
                placeholder="Digite su contraseña"
                secureTextEntry={this.state.hidden}
                style={styles.textInput}
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

            <View style={styles.textPrivate}>
              <Text style={styles.color_textPrivate}>
                Al registrarse acepta nuestros
              </Text>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Términos de servicio
              </Text>
              <Text style={styles.color_textPrivate}> y</Text>
              <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
                {" "}
                Políticas de privacidad
              </Text>
            </View>
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
                onPress={this.handleSignUp}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
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
                  Atrás
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#404143",
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
    color: "#FFFF",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#ffff",
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
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
