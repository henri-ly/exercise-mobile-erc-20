import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function Card(props) {
  return (
    <View style={{ ...styles.container, ...props.styleContainer }}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{props.title}</Text>
        {props.icon && <Ionicons name={props.icon} color="black" />}
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24
  },
  titleRow: {
    flexDirection: "row"
  }
});
