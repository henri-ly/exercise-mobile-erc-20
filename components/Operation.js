import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Operation(type, date, amount, symbol, operation) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row"
  },
  title: {
    fontSize: 24
  },
  titleRow: {
    flexDirection: "row"
  }
});
