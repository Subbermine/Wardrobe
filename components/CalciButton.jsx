import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function CalciButton({
  inputText,
  buttonColor,
  symbol,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={() => onPress(inputText)}>
      <View style={[styles.circle, { backgroundColor: buttonColor }]}>
        {symbol ? (
          <FontAwesome5 name={symbol} size={24} color="white" />
        ) : (
          <Text style={styles.text}>{inputText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
