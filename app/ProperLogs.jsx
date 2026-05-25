import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import LogsElement from "./LogsElement";
import { db, collection, query, orderBy } from "../utils/firebase";
import { onSnapshot } from "firebase/firestore";

export default function ProperLogs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create query to fetch orders sorted by time/timestamp descending
    const q = query(collection(db, "orders"), orderBy("time", "desc"));
    
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setUsers(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching real-time logs:", error);
      setLoading(false);
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: "black" }]}>
        <ActivityIndicator size="large" color="#4169E1" />
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      {users.length > 0 ? (
        users.map((user, index) => (
          <LogsElement
            billno={users.length - index} // Dynamic bill number based on descending order
            category={user.category === "semi" ? "Semi-Bridal" : user.category}
            quantity={user.quantity}
            amount={user.amount + "₹"}
            key={user.id || index}
            time={user.time}
            {...user}
          />
        ))
      ) : (
        <Text style={styles.txt}>Empty</Text>
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
    marginTop: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
