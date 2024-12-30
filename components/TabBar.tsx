import React from "react";
import { View, Text, Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useLinkBuilder } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const icon: { [key: string]: (props: any) => JSX.Element } = {
    Gpay: (props: any) => (
      <FontAwesome5
        name="google-pay"
        style={{ textAlign: "center", justifyContent: "center" }}
        size={20}
        color={props.color}
      />
    ),
    Calci: (props: any) => (
      <Entypo
        name="calculator"
        style={{ textAlign: "center", justifyContent: "center" }}
        size={20}
        color={props.color}
      />
    ),
    index: (props: any) => (
      <FontAwesome5
        name="list"
        style={{ textAlign: "center", justifyContent: "center" }}
        size={20}
        color={props.color}
      />
    ),
    Logs: (props: any) => (
      <FontAwesome
        name="cloud"
        style={{ textAlign: "center", justifyContent: "center" }}
        size={20}
        color={props.color}
      />
    ),
  };

  return (
    <View style={[{ flexDirection: "row" }, styles.tabbar]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            {icon[route.name]({ color: isFocused ? colors.primary : "white" })}
            <Text
              style={{
                color: isFocused ? colors.primary : "white",
                textAlign: "center",
                padding: 8,
              }}
            >
              {typeof label === "function"
                ? label({
                    focused: isFocused,
                    color: isFocused ? colors.primary : "white",
                    position: "below-icon",
                    children: "",
                  })
                : label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = {
  tabbar: {
    backgroundColor: "black",
    borderTopWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
};
