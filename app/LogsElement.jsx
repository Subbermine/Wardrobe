import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "./context/DataContext";

export default function LogsElement(props) {
  const navigation = useNavigation();
  const { setData } = React.useContext(DataContext);

  const handlePress = () => {
    setData({ ...props, billno: props.billno.toString() });
    navigation.navigate("EditPage");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>
          Bill No: <Text style={styles.valueText}>{props.billno}</Text>
        </Text>
        <Text style={styles.titleText}>
          Category:{" "}
          <Text style={styles.valueText}>
            {props.category === "semi"
              ? "Semi-Bridal"
              : props.category === "bridal"
              ? "Bridal"
              : "Suit"}
          </Text>
        </Text>
        <Text style={styles.titleText}>
          Quantity: <Text style={styles.valueText}>{props.quantity}</Text>
        </Text>
        <Text style={styles.titleText}>
          Amount: <Text style={styles.valueText}>{props.amount}</Text>
        </Text>
        <Text style={styles.titleText}>
          Time: <Text style={styles.valueText}>{props.time}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <AntDesign name="edit" size={24} color="#4169E1" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: "#4169E1",
    borderWidth: 1,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  titleText: {
    fontSize: 14,
    color: "#A5A5A5",
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});
