import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Radio({ options, checkedValue, onChange }) {
  return (
    <View style={[styles.container]}>
      {options.map((option) => {
        let active = checkedValue === option.value;

        return (
          <TouchableOpacity
            style={
              active
                ? [styles.radio, styles.activeRadio]
                : [styles.radio, styles.borderThing]
            }
            onPress={() => {
              onChange(option.value);
            }}
            key={option.value}
          >
            <MaterialIcons
              name={active ? "radio-button-checked" : "radio-button-unchecked"}
              size={20}
              color={active ? "#06b6d6" : "#64748b"}
            />
            <Text
              style={active ? [styles.text, styles.activeText] : styles.text}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row", // Arrange options in a row
    justifyContent: "space-between", // Even spacing between items
    alignItems: "center", // Vertically center items
  },
  radio: {
    height: 60,
    flex: 1,
    alignItems: "center", // Horizontally center icon and text
    justifyContent: "center", // Vertically center content
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    flexDirection: "row", // Align icon and text horizontally
  },
  activeRadio: {
    backgroundColor: "#087ca7",
    color: "black",
  },
  text: {
    fontSize: 12,
    marginLeft: 15,
    color: "#F8FAE5",
  },
  activeText: {
    color: "#374151",
  },
  borderThing: {
    borderWidth: 2,
    borderColor: "#087ca7", // Border color
    borderRadius: 10,
  },
});
