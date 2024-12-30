import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import LogsElement from "@/components/LogsElement";
import axios from "axios";
// import { ScrollView } from "react-native-web";

export default function ProperLogs() {
  const [users, setUsers] = useState([]);
  axios
    .get("http://15.152.240.98:3000/logs") // Replace with your backend URL
    .then((response) => {
      setUsers(response.data); // Set the fetched data to state
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      {users.length > 0 ? (
        users.map((user, index) => (
          <LogsElement
            billno={index + 1}
            category={user.category === "semi" ? "Semi-Bridal" : user.category}
            quantity={user.quantity}
            amount={user.amount + "₹"}
            key={index}
            time={user.time}
            {...user}
          />
        ))
      ) : (
        <Text style={styles.txt}>Empty</Text> // or any fallback message
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
  },
});
