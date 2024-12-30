import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function RadioLabel({
  label,
  value,
  onChangeText,
  placeholder,
  inputType,
}) {
  const handleNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    onChangeText(numericText);
  };

  const handleTextChange = (text) => {
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={
          inputType === "numeric" ? handleNumberChange : handleTextChange
        }
        placeholder={placeholder}
        keyboardType={inputType} // Set keyboard to numeric
        placeholderTextColor="rgba(90,131,189,270)" // Ensure placeholder text is visible
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Change to column to stack label and input vertically
    alignItems: "flex-start", // Align items to the start of the container
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5, // Add margin to separate label from input
    color: "rgba(194,219,255,1)",
  },
  input: {
    width: "100%", // Ensure input takes full width of container
    height: 40,
    borderColor: "rgba(90,131,189,270)",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#64748b", // Ensure input text color is visible
  },
});
