import { Tabs } from "expo-router";
import MyTabBar from "../../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen
        options={{ headerShown: false, tabBarLabel: "Order" }}
        name="index"
      />
      <Tabs.Screen
        name="Gpay"
        options={{ headerShown: false, tabBarLabel: "Gpay" }}
      />
      <Tabs.Screen
        name="Calci"
        options={{ headerShown: false, tabBarLabel: "Calculator" }}
      />
      <Tabs.Screen
        name="Logs"
        options={{ headerShown: false, tabBarLabel: "Logs" }}
      />
    </Tabs>
  );
}
