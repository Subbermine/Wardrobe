import { StyleSheet, View, Text, Image, Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const { width } = Dimensions.get("window");

export default function Gpay() {
  const { data } = useContext(DataContext);
  const displayAmount = data?.amount || "0";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>

      </View>

      <View style={styles.qrSection}>
        <Image
          source={require("../../assets/images/Gpay.jpeg")}
          style={styles.qrImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.qrHint}>Scan to Pay via Google Pay</Text>
        <Image
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" }}
          style={styles.gpayLogo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "black",
  },
  amountLabel: {
    color: "#888",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 5,
  },
  amountValue: {
    color: "white",
    fontSize: 54,
    fontWeight: "bold",
  },
  qrSection: {
    flex: 1,
    backgroundColor: "white",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  qrImage: {
    width: width,
    height: "100%",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "black",
  },
  qrHint: {
    color: "#888",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  gpayLogo: {
    width: 120,
    height: 40,
  },
});
