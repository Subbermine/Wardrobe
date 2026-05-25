import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Logs from "../screens/Logs";
import RadioPage from "../screens/RadioPagesScreen";
import Calculator from "../screens/Calci";
import Gpay from "../screens/Gpay";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case "Gpay":
              return (
                <FontAwesome5
                  name="google-pay"
                  style={{ textAlign: "center", justifyContent: "center" }}
                  size={24}
                  color={color}
                />
              );
            case "Order":
              return (
                <FontAwesome5
                  name="list"
                  style={{ textAlign: "center", justifyContent: "center" }}
                  size={24}
                  color={color}
                />
              );
            case "Calculator":
              return (
                <Entypo
                  name="calculator"
                  style={{ textAlign: "center", justifyContent: "center" }}
                  size={24}
                  color={color}
                />
              );
            case "Logs":
              return (
                <FontAwesome5
                  name="cloud"
                  style={{ textAlign: "center", justifyContent: "center" }}
                  size={24}
                  color={color}
                />
              );
            default:
              return null;
          }
        },
        tabBarStyle: styles.tabbar,
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen
        name="Order"
        options={{ headerShown: false }}
        component={RadioPage}
      />
      <Tab.Screen
        name="Gpay"
        component={Gpay}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Logs"
        component={Logs}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: "black",
  },
});
