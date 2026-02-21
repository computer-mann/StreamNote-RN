import { Link } from "expo-router";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export class NewTracks extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topText}>NewTracks</Text>
        <Link style={styles.links} href="/profile?limit=20">
          View users
        </Link>
      </View>
    );
  }
}

export default NewTracks;

const styles = StyleSheet.create({
  links: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 45,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
