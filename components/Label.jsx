import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Label({ value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", // Span the entire width of the parent container
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    padding: 10, // Add some padding
  },
  text: {
    fontSize: 18,
    color: "#05B2DC",
  },
});
