import { StyleSheet, ImageBackground } from "react-native";
import React from "react";

export default function Gpay() {
  return (
    <ImageBackground
      source={require("../../assets/images/Gpay.jpeg")} // Adjust the path to your image
      style={styles.background}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
