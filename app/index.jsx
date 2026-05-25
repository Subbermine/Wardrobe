import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabs from "./Navigators/HomeTabs";
import ProperLogs from "./ProperLogs";
import PasswordPage from "./Password";
import EditArea from "./EditArea";
import { NavigationContainer } from "@react-navigation/native";
import { NavigationIndependentTree } from "@react-navigation/core";
import { DataProvider } from "./context/DataContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: "black",
              },
              headerTintColor: "white",
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeTabs}
            />
            <Stack.Screen name="ProperLogs" component={ProperLogs} />
            <Stack.Screen name="Password" component={PasswordPage} />
            <Stack.Screen
              name="EditPage"
              options={{
                title: "Edit Detials",
              }}
              // options={{ headerShown: false }}
              component={EditArea}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </DataProvider>
  );
};
