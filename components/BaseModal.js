import React from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";

export function BaseModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isVisible}
      onRequestClose={() => {
        props.closeModal();
      }}
    >
      <View style={{ padding: 30, margin: 15, backgroundColor: "#fff" }}>
        <TouchableHighlight
          onPress={() => {
            props.closeModal();
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {props.closeText}
          </Text>
        </TouchableHighlight>
        {props.children}
      </View>
    </Modal>
  );
}
