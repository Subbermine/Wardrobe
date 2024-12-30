import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="ProperLogs"
        options={{
          title: "Logs",
          statusBarBackgroundColor: "#000000",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name="EditArea"
        options={{
          title: "Edit",
          statusBarBackgroundColor: "#000000",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "black" },
        }}
      />
    </Stack>
  );
};

export default _layout;
