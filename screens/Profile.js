import React from "react";
import { View, SafeAreaView, StyleSheet, Button } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { firebase } from "../database/config";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

class Profile extends React.Component {
  handleSignout = () => {
    firebase.auth().signOut();
    this.props.route.params.rootNavigation.navigate("Splash");
  };

  render() {
    return (
      console.log(this.props.user),
      (
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
                }}
                size={80}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  David Valverde
                </Title>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                Alajuela, Costa Rica
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                +506 1234 567
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {this.props.user.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor: "#dddddd",
                  borderRightWidth: 1,
                },
              ]}
            >
              <Title>6</Title>
              <Caption>Reportes Realizados</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>36</Title>
              <Caption>Desfogues en Alajuela</Caption>
            </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={this.handleSignout}>
              <View style={styles.menuItem}>
                <Icon name="exit-to-app" color="#FF6347" size={25} />
                <Text style={styles.menuItemText}>Cerrar Sesión</Text>
              </View>
            </TouchableRipple>
          </View>
        </SafeAreaView>
      )
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
