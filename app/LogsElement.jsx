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

  const categoryMap = { suit: "Suit", semi: "Semi-Bridal", bridal: "Bridal" };
  const subCategoryMap = { 
    gown: "Gown", 
    handwork: "Handwork Suit", 
    lehengda: "Lehenga", 
    ghagara: "Ghagara", 
    farara: "Farara" 
  };
  const setMap = { piece3: "3 Piece set", gownset: "Gown set" };
  const paymentMap = { cash: "Cash", upi: "UPI", card: "Card" };

  const displayCategory = categoryMap[props.category] || props.category || "-";
  const subCategory = subCategoryMap[props.semicategory || props.bridalcategory] || props.semicategory || props.bridalcategory || "-";
  const stitchedStatus = props.stiched === "stiched" ? "Stitched" : (props.stiched === "unstiched" ? "Unstitched" : (props.stiched || "-"));
  const setType = setMap[props.subunstiched] || props.subunstiched || "-";
  const paymentMode = paymentMap[props.payment] || props.payment || "-";

  const cleanAmount = String(props.amount || "0").replace(/[^\d.]/g, "");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.billText}>Bill No: {props.billno}</Text>
          <Text style={styles.timeText}>{props.time}</Text>
        </View>
        <TouchableOpacity style={styles.editIconButton} onPress={handlePress}>
          <AntDesign name="edit" size={20} color="#4169E1" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>{props.name || "N/A"}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{props.number || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{displayCategory}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Sub-Category</Text>
            <Text style={styles.value}>{subCategory}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{stitchedStatus}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Set Type</Text>
            <Text style={styles.value}>{setType}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.item}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>{paymentMode}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Qty | Amount</Text>
            <Text style={styles.value}>{props.quantity || 0} | ₹{cleanAmount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 8,
    marginBottom: 12,
  },
  billText: {
    fontSize: 16,
    color: "#4169E1",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  editIconButton: {
    padding: 4,
  },
  content: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
  },
});
