import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";

export default function EditArea({ route }) {
  const { name, id } = route?.params || {};

  const handleSave = () => {
    // Handle save logic (e.g., send to server, etc.)
    // console.log("Saved:", text);
  };

  return (
    <View style={styles.container}>
      {console.log("Data being retrieved:", name)}
      <Text style={{ color: "white" }}>Category:{}</Text>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

// category: category,
// stiched: stiched,
// payment: payment,
// semicategory: semicategory,
// subunstiched: subunstiched,
// bridalcategory: bridalcategory,
// quantity: quantity,
// amount: amount,
// number: number,
// name: name,
// time: time,

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
