import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

export class MainTabs extends Component {
  render() {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Tabs.Screen
          name="new-tracks"
          options={{
            title: "New Tracks",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="musical-notes" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="albums"
          options={{
            title: "Albums",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: "Artists",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }
}

export default MainTabs;

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 16,
    fontFamily: "Georgia",
    fontWeight: 300,
  },
});
