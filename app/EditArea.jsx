import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";

export default function EditArea() {
  const { params } = useRouter();
  const { data } = params || {};
  const parsedData = data ? JSON.parse(decodeURIComponent(data)) : {};

  console.log("Received data:", params);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Area</Text>

      {parsedData.category ? (
        <>
          <Text style={styles.label}>Category:</Text>
          <TextInput
            style={styles.textInput}
            defaultValue={parsedData.category}
          />
        </>
      ) : (
        <Text style={styles.warningText}>No category data provided</Text>
      )}

      <Button title="Save" onPress={() => console.log("Save button pressed")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: "white",
    marginBottom: 20,
    backgroundColor: "#1e1e1e",
  },
  label: {
    fontSize: 18,
    color: "white",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
  },
});
