import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MonoText } from "./StyledText";

export function Balance(props) {
  return (
    <View style={styles.container}>
      <MonoText style={styles.symbol}>{props.symbol}</MonoText>
      <Text style={styles.balance}>{props.balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  balance: {
    fontSize: 24,
    color: "#777777",
    fontWeight: "bold"
  },
  symbol: {
    fontSize: 24
  }
});
