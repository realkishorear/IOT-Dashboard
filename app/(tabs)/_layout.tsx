import { View, Text, Image, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import React from "react";

// Define the props for TabIcon
interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        style={[styles.icon, { tintColor: color }]}
        resizeMode="contain"
      />
      <Text style={[styles.text, focused ? styles.textFocused : styles.textRegular]}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout: React.FC = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Dashboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="IOT 1" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="logs"
          options={{
            title: "Dashboard2",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Logs" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Stats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="ML" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="stats"
          options={{
            title: "Stats1",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="DL" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 6, // Space below icon and text
  },
  icon: {
    width: 25, // Slightly larger for better visibility
    height: 25,
    marginBottom: 2, // Space between icon and text
  },
  text: {
    fontSize: 10, // Slightly larger text for readability
    color: "white",
  },
  textRegular: {
    fontWeight: "400",
  },
  textFocused: {
    fontWeight: "600",
  },
  tabBar: {
    height: 65, // Increased for better spacing
    paddingBottom: 10, // More space at the bottom
    paddingTop: 18, // Space between icon and top edge
    backgroundColor: "#161622",
    borderTopWidth: 0,
    borderTopColor: "#232533",
  },
});

export default TabsLayout;
