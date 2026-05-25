import { StyleSheet, View, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import Button from "@/components/CalciButton";

const { width } = Dimensions.get("window");

export default function Calci() {
  const [calcInput, setCalcInput] = useState("");
  const [result, setResult] = useState("");

  const buttons = [
    { label: "AC", value: "AC", color: "#a5a5a5", textColor: "black" },
    { label: "(", value: "(", color: "#a5a5a5", textColor: "black" },
    { label: ")", value: ")", color: "#a5a5a5", textColor: "black" },
    { label: "÷", value: "/", color: "#ff9f0a", textColor: "white" },
    
    { label: "7", value: "7", color: "#333333", textColor: "white" },
    { label: "8", value: "8", color: "#333333", textColor: "white" },
    { label: "9", value: "9", color: "#333333", textColor: "white" },
    { label: "×", value: "*", color: "#ff9f0a", textColor: "white" },
    
    { label: "4", value: "4", color: "#333333", textColor: "white" },
    { label: "5", value: "5", color: "#333333", textColor: "white" },
    { label: "6", value: "6", color: "#333333", textColor: "white" },
    { label: "-", value: "-", color: "#ff9f0a", textColor: "white" },
    
    { label: "1", value: "1", color: "#333333", textColor: "white" },
    { label: "2", value: "2", color: "#333333", textColor: "white" },
    { label: "3", value: "3", color: "#333333", textColor: "white" },
    { label: "+", value: "+", color: "#ff9f0a", textColor: "white" },
    
    { label: "0", value: "0", color: "#333333", textColor: "white" },
    { label: ".", value: ".", color: "#333333", textColor: "white" },
    { label: "⌫", value: "backspace", color: "#333333", textColor: "white" },
    { label: "=", value: "=", color: "#ff9f0a", textColor: "white" },
  ];

  const handlePress = (value) => {
    if (value === "AC") {
      setCalcInput("");
      setResult("");
    } else if (value === "backspace") {
      setCalcInput(calcInput.slice(0, -1));
    } else if (value === "=") {
      if (!calcInput) return;
      try {
        const sanitized = calcInput.replace(/[^-+*/().0-9]/g, "");
        if (!sanitized) return;
        const evalResult = eval(sanitized);
        setResult(calcInput + " =");
        setCalcInput(Number.isInteger(evalResult) ? evalResult.toString() : evalResult.toFixed(2).toString());
      } catch (e) {
        setCalcInput("Error");
      }
    } else {
      if (calcInput === "Error") {
        setCalcInput(value);
      } else {
        setCalcInput(calcInput + value);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.resultText}>{result}</Text>
        <Text style={styles.inputText} numberOfLines={1} adjustsFontSizeToFit>
          {calcInput || "0"}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {buttons
              .slice(rowIndex * 4, rowIndex * 4 + 4)
              .map((button, index) => (
                <Button
                  key={index}
                  inputText={button.value}
                  label={button.label}
                  buttonColor={button.color}
                  textColor={button.textColor}
                  onPress={handlePress}
                />
              ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    paddingBottom: 40,
  },
  resultText: {
    color: "#888",
    fontSize: 24,
    marginBottom: 10,
  },
  inputText: {
    color: "white",
    fontSize: 70,
    fontWeight: "300",
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
});
