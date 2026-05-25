import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import Button from "@/components/Button/Button";
import { useNavigation } from "@react-navigation/native";

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // I'm removing the password validation logic from the component
  // to keep it simple and focused on the UI part.

  const handleSubmit = () => {
    let pass = password.trim().toLowerCase();
    const snapshot = await getDocs(collection(db, "password"));
    const DBpass = snapshot.docs[0].data().pass;
    if (pass !== DBpass) {
      Alert.alert("Error", "Please enter the correct password");
      setPassword("");
    } else {
      setPassword("");
      navigation.pop();
      navigation.navigate("ProperLogs");
    }

  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        placeholderTextColor="white"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Submit" onPress={handleSubmit}>
        Enter
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    color: "white",
    borderRadius: 10,
    borderBottomColor: "#087ca7",
    borderWidth: 1,
  },
});

export default PasswordPage;
