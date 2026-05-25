import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");
const BUTTON_WIDTH = (width - 60) / 4;

export default function CalciButton({
  inputText,
  label,
  buttonColor,
  textColor = "white",
  symbol,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={() => onPress(inputText)}>
      <View style={[styles.button, { backgroundColor: buttonColor }]}>
        {symbol ? (
          <FontAwesome5 name={symbol} size={24} color={textColor} />
        ) : (
          <Text style={[styles.text, { color: textColor }]}>{label || inputText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "500",
  },
});
