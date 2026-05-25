import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { DataContext } from "./context/DataContext";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { db, doc, updateDoc, deleteDoc } from "../utils/firebase";

export default function EditArea() {
  const navigation = useNavigation();
  const { data } = useContext(DataContext);
  const [copy, setCopy] = useState({ ...data });

  const handleChanges = async () => {
    try {
      if (!copy.id) {
        Alert.alert("Error", "Missing order document ID.");
        return;
      }

      const orderDocRef = doc(db, "orders", copy.id);
      await updateDoc(orderDocRef, {
        name: copy.name,
        number: copy.number,
        category: copy.category,
        stiched: copy.stiched || "",
        semicategory: copy.semicategory || "",
        bridalcategory: copy.bridalcategory || "",
        subunstiched: copy.subunstiched || "",
        payment: copy.payment,
        quantity: copy.quantity,
        amount: copy.amount,
        time: copy.time,
      });
      
      Alert.alert("Success", "Edit successful");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      navigation.pop();
    }
  };

  const showAlert = (change) => {
    Alert.alert(
      "Confirmation",
      "Do you want to save the following changes?\n" + change,
      [
        {
          text: "No",
          onPress: () => {
            console.log("No");
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleChanges(),
        },
      ],
      { cancelable: true }
    );
  };

  const handleSave = () => {
    let change = "";
    console.log("Save button pressed");
    if (
      (copy.category === "suit" && copy.stiched === "") ||
      (copy.category === "semi" && copy.semicategory === "") ||
      (copy.category === "bridal" && copy.bridalcategory === "") ||
      (copy.stiched === "unstiched" &&
        copy.subunstiched === "" &&
        copy.category !== "suit")
    ) {
      Alert.alert("Error", "Please fill all the required fields");
      return;
    }
    if (copy.number.length !== 10) {
      alert("Please enter a valid number");
      return;
    }
    if (copy.name.length === 0) {
      alert("Please enter a valid name");
      return;
    }
    for (let key in copy) {
      if (copy[key] !== data[key]) {
        change += `${key}: ${data[key] === undefined ? "" : data[key]} -> ${
          copy[key]
        }\n`;
      }
    }
    if (change.length === 0) {
      navigation.pop();
      return;
    }
    showAlert(change);
    console.log("Changes made:", change);
  };

  const handleDelete = async () => {
    try {
      if (!copy.id) {
        Alert.alert("Error", "Missing order document ID.");
        return;
      }

      const orderDocRef = doc(db, "orders", copy.id);
      await deleteDoc(orderDocRef);

      Alert.alert("Success", "User deleted successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      navigation.pop();
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this entry? This action cannot be undone",
      [
        {
          text: "No",
          onPress: () => {
            console.log("No");
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDelete(),
        },
      ],
      { cancelable: true }
    );
  };

  const semicategoryOptions = [
    { label: "Gown", value: "gown" },
    { label: "Handwork suit", value: "handwork" },
  ];

  const bridalOptions = [
    { label: "Gown", value: "gown" },
    { label: "Lehenga", value: "lehenga" },
    { label: "Ghagara", value: "ghagara" },
    { label: "Farara", value: "farara" },
  ];

  const setOptions = [
    { label: "Gown set", value: "gownset" },
    { label: "3 Piece Set", value: "piece3" },
  ];
  const categoryOptions = [
    { label: "Suit", value: "suit" },
    { label: "Semi-Bridal", value: "semi" },
    { label: "Bridal", value: "bridal" },
  ];

  const stichedOptions = [
    { label: "Stitched", value: "stiched" },
    { label: "Unstitched", value: "unstiched" },
  ];

  const paymentOptions = [
    { label: "UPI", value: "upi" },
    { label: "Cash", value: "cash" },
    { label: "Card", value: "card" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.field}>
        <Text style={styles.label}>Bill No:</Text>
        <TextInput
          editable={false}
          style={[styles.textInput, styles.disable]}
          defaultValue={copy?.billno || ""}
          placeholder="Enter Bill No"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={copy?.name || ""}
          onChangeText={(text) => {
            setCopy({ ...copy, name: text });
          }}
          placeholder="Enter Name"
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Number:</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={copy?.number || ""}
          onChangeText={(text) => {
            setCopy({ ...copy, number: text });
          }}
          placeholder="Enter Number"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Category:</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: "Select Category", value: "" }}
        onValueChange={(value) => {
          console.log("Category selected:", value);
          setCopy({ ...copy, category: value });
        }}
        items={categoryOptions}
        value={copy?.category || ""}
      />

      {copy.category === "suit" && (
        <View style={styles.field}>
          <Text style={styles.label}>Stitched:</Text>
          <RNPickerSelect
            placeholder={{ label: "Select", value: "" }}
            style={pickerSelectStyles}
            onValueChange={(value) => {
              setCopy({ ...copy, stiched: value });
            }}
            items={stichedOptions}
            value={copy?.stiched || ""}
          />
        </View>
      )}

      {copy.category === "semi" && (
        <>
          <View style={styles.field}>
            <Text style={styles.label}>Semi-Bridal Category:</Text>
            <RNPickerSelect
              placeholder={{ label: "Select a Category", value: "" }}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                setCopy({ ...copy, semicategory: value });
              }}
              items={semicategoryOptions}
              value={copy?.semicategory || ""}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Stitched:</Text>
            <RNPickerSelect
              placeholder={{ label: "Select", value: "" }}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                setCopy({ ...copy, stiched: value });
              }}
              items={stichedOptions}
              value={copy?.stiched || ""}
            />
          </View>
        </>
      )}

      {copy.category === "bridal" && (
        <>
          <View style={styles.field}>
            <Text style={styles.label}>Bridal Category:</Text>
            <RNPickerSelect
              placeholder={{ label: "Select", value: "" }}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                setCopy({ ...copy, bridalcategory: value });
              }}
              items={bridalOptions}
              value={copy?.bridalcategory || ""}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Stitched:</Text>
            <RNPickerSelect
              placeholder={{ label: "Select", value: "" }}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                setCopy({ ...copy, stiched: value });
              }}
              items={stichedOptions}
              value={copy?.stiched || ""}
            />
          </View>
        </>
      )}

      {copy.stiched === "unstiched" &&
        (copy.category === "semi" || copy.category === "bridal") && (
          <View style={styles.field}>
            <Text style={styles.label}>Set:</Text>
            <RNPickerSelect
              placeholder={{ label: "Select ", value: "" }}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                setCopy({ ...copy, subunstiched: value });
              }}
              items={setOptions}
              value={copy?.subunstiched || ""}
            />
          </View>
        )}

      <View style={styles.field}>
        <Text style={styles.label}>Payment Mode:</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: "Select Payment Mode", value: "" }}
          onValueChange={(value) => {
            setCopy({ ...copy, payment: value });
          }}
          items={paymentOptions}
          value={copy?.payment || ""}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Quantity:</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={data?.quantity || ""}
          onChangeText={(text) => {
            setCopy({ ...copy, quantity: text });
          }}
          placeholder="Enter Quantity"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Amount: (in INR₹)</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={copy?.amount || ""}
          onChangeText={(text) => {
            setCopy({ ...copy, amount: text });
          }}
          placeholder="Enter Amount"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "white",
    marginBottom: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "black",
    paddingBottom: 20, // Add padding to the bottom to prevent clipping
  },
  textInput: {
    height: 45,
    borderColor: "#2a2a2a",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "white",
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    flex: 1,
    backgroundColor: "#4169E1", // Royal blue color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  disable: {
    backgroundColor: "#2a2a2a",
    color: "#888",
  },
  cancelButton: {
    backgroundColor: "#FF6347", // Tomato red color
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 8,
    color: "white",
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 8,
    color: "white",
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
