import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Button({ style, symbol, ...props }) {
  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Text style={styles.text}>{props.children + " "}</Text>
      {symbol === "check-circle" && (
        <MaterialIcons name={symbol} size={20} color="#f9fafb" />
      )}
      {symbol === "file-document-outline" && (
        <MaterialCommunityIcons
          name="file-document-outline"
          size={24}
          color="white"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#087ca7",
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});
