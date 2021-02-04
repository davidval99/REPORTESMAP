import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableRipple,
  Switch,
} from "react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={() => {
          toggleTheme();
        }}
      >
        <View style={styles.preference}>
          <Text>Dark Theme</Text>
          <View pointerEvents="none">
            <Switch value={paperTheme.dark} />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
