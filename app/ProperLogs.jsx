import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import LogsElement from "./LogsElement";
import { db, collection, query, orderBy } from "../utils/firebase";
import { onSnapshot } from "firebase/firestore";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ProperLogs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("time", "desc"));
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
    return () => unsubscribe();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user, index) => {
      const searchStr = searchQuery.toLowerCase();
      const originalIndex = users.findIndex(u => u.id === user.id);
      const billno = String(users.length - originalIndex);

      return (
        (billno.includes(searchStr)) ||
        (user.name?.toLowerCase().includes(searchStr)) ||
        (user.number?.includes(searchStr)) ||
        (user.category?.toLowerCase().includes(searchStr)) ||
        (user.semicategory?.toLowerCase().includes(searchStr)) ||
        (user.bridalcategory?.toLowerCase().includes(searchStr)) ||
        (user.payment?.toLowerCase().includes(searchStr)) ||
        (user.time?.toLowerCase().includes(searchStr))
      );
    });
  }, [users, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredUsers.length;
    const revenue = filteredUsers.reduce((acc, user) => {
      const cleanAmount = String(user.amount || "0").replace(/[^\d.]/g, "");
      return acc + (Number(cleanAmount) || 0);
    }, 0);
    const totalQty = filteredUsers.reduce((acc, user) => acc + (Number(user.quantity) || 0), 0);
    return { total, revenue, totalQty };
  }, [filteredUsers]);

  const downloadCSV = async () => {
    if (users.length === 0) {
      Alert.alert("No data", "There is no data to download.");
      return;
    }

    try {
      const headers = ["Bill No", "Date & Time", "Customer Name", "Phone Number", "Category", "Sub-Category", "Stitched", "Set", "Payment Mode", "Quantity", "Amount (₹)"];
      const rows = users.map((user, index) => {
        const billno = users.length - index;
        const categoryMap = { suit: "Suit", semi: "Semi-Bridal", bridal: "Bridal" };
        const subCategoryMap = { gown: "Gown", handwork: "Handwork Suit", lehengda: "Lehenga", ghagara: "Ghagara", farara: "Farara" };
        const setMap = { piece3: "3 Piece set", gownset: "Gown set" };
        const paymentMap = { cash: "Cash", upi: "UPI", card: "Card" };

        const category = categoryMap[user.category] || user.category || "-";
        const subCategory = subCategoryMap[user.semicategory || user.bridalcategory] || user.semicategory || user.bridalcategory || "-";
        const stiched = user.stiched === "stiched" ? "Stitched" : (user.stiched === "unstiched" ? "Unstitched" : (user.stiched || "-"));
        const set = setMap[user.subunstiched] || user.subunstiched || "-";
        const payment = paymentMap[user.payment] || user.payment || "-";

        const cleanAmount = String(user.amount || "0").replace(/[^\d.]/g, "");

        const escape = (val) => {
          if (val === undefined || val === null) return "";
          const str = String(val);
          return str.includes(",") ? "\"" + str.replace(/"/g, "\"\"") + "\"" : str;
        };

        return [billno, escape(user.time), escape(user.name), escape(user.number), escape(category), escape(subCategory), escape(stiched), escape(set), escape(payment), escape(user.quantity), escape(cleanAmount)].join(",");
      });

      const csvContent = [headers.join(","), ...rows].join("\n");
      const fileName = `ProperLogs_${new Date().toISOString().split("T")[0]}.csv`;
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: "utf8" });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("Error", "Sharing is not available");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to generate CSV");
    }
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: "black" }]}>
        <ActivityIndicator size="large" color="#4169E1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>{stats.total}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Quantity</Text>
          <Text style={styles.statValue}>{stats.totalQty}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={[styles.statValue, { color: "#4CAF50" }]}>₹{stats.revenue}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <View style={styles.searchContainer}>
          <AntDesign name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search name, phone, bill no..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.downloadIconButton} onPress={downloadCSV}>
          <AntDesign name="download" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => {
            const originalIndex = users.findIndex(u => u.id === user.id);
            const billno = users.length - originalIndex;

            return (
              <LogsElement
                key={user.id || index}
                billno={billno}
                {...user}
              />
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <AntDesign name="inbox" size={60} color="#333" />
            <Text style={styles.emptyTxt}>No logs found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  dashboard: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  statCard: {
    flex: 0.31,
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  statLabel: {
    color: "#888",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  statValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    borderWidth: 1,
    borderColor: "#333",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "white",
    fontSize: 14,
  },
  downloadIconButton: {
    backgroundColor: "#4169E1",
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyTxt: {
    color: "#555",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
