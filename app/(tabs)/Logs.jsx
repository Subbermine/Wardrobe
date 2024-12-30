import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "../../components/Button/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function Logs() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        style={styles.text}
        onPress={() => {
          navigation.navigate("ProperLogs");
        }}
        symbol={"file-document-outline"}
      >
        Logs
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
