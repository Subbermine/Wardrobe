import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import Button from "@/components/CalciButton";

export default function Calci() {
  const [calcInput, setCalcInput] = useState("");

  const buttons = [
    { inputText: "backspace", buttonColor: "red", symbol: "backspace" },
    { inputText: "(", buttonColor: "grey", symbol: null },
    { inputText: ")", buttonColor: "grey", symbol: null },
    { inputText: "/", buttonColor: "orange", symbol: null },
    { inputText: "7", buttonColor: "#009f9f", symbol: null },
    { inputText: "8", buttonColor: "#009f9f", symbol: null },
    { inputText: "9", buttonColor: "#009f9f", symbol: null },
    { inputText: "*", buttonColor: "orange", symbol: null },
    { inputText: "4", buttonColor: "#009f9f", symbol: null },
    { inputText: "5", buttonColor: "#009f9f", symbol: null },
    { inputText: "6", buttonColor: "#009f9f", symbol: null },
    { inputText: "-", buttonColor: "orange", symbol: null },
    { inputText: "1", buttonColor: "#009f9f", symbol: null },
    { inputText: "2", buttonColor: "#009f9f", symbol: null },
    { inputText: "3", buttonColor: "#009f9f", symbol: null },
    { inputText: "+", buttonColor: "orange", symbol: null },
    { inputText: "AC", buttonColor: "red", symbol: null },
    { inputText: "0", buttonColor: "#009f9f", symbol: null },
    { inputText: ".", buttonColor: "#009f9f", symbol: null },
    { inputText: "=", buttonColor: "orange", symbol: null },
  ];

  const handlePress = (input) => {
    if (calcInput === "Error") {
      setCalcInput("");
      if (input === "AC") return;
      setCalcInput(input);
    } else {
      if (input === "backspace") {
        setCalcInput(calcInput.slice(0, -1));
      } else if (input === "AC") {
        setCalcInput("");
      } else if (input === "=") {
        try {
          setCalcInput(eval(calcInput).toFixed(2).toString());
        } catch (e) {
          setCalcInput("Error");
        }
      } else {
        setCalcInput(calcInput + input);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.text}>{calcInput}</Text>
      </View>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {buttons
            .slice(rowIndex * 4, rowIndex * 4 + 4)
            .map((button, index) => (
              <Button
                key={index}
                inputText={button.inputText}
                buttonColor={button.buttonColor}
                symbol={button.symbol}
                onPress={handlePress}
                style={styles.cell}
              />
            ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  topRow: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensure space between cells
    marginBottom: 15, // Add margin between rows
    width: "90%",
  },
  cell: {
    flex: 1,
    marginHorizontal: 10, // Increased horizontal margin between cells
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    height: 100,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
