import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Página en proceso</Text>
      <Button title="Click Here" onPress={() => alert("Hola!")} />
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
