import React, { useEffect, useState, useReducer } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Button
} from "react-native";
import { MonoText } from "../components/StyledText";
import { isValidEthereum } from "../utils/ledgerEthUtils";
import { historyReducer, HISTORY_PUSH } from "../reducers/historyReducers";

const HISTORY = [
  "0xa910f92acdaf488fa6ef02174fb86208ad7722ba",
  "0x4e9ce36e442e55ecd9025b9a6e0d88485d628a67"
];

const TRY_HISTORY = [
  "0xc7652d6f0d7c4a81029800ad94ef4c3a8f809950",
  "0x6a164122d5cf7c840D26e829b46dCc4ED6C0ae48"
];

export default function HomeScreen(props) {
  const [address, setAddress] = useState("");
  const [historyState, dispatchHistory] = useReducer(historyReducer, HISTORY);

  useEffect(() => {
    if (isValidEthereum(address)) {
      props.navigation.navigate("Wallet", { address });
      dispatchHistory({ type: HISTORY_PUSH, payload: address });
    }
  }, [address]);

  const clearAndSetAddress = address => {
    setAddress("");
    setAddress(address);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.addressContainer}>
        <Text>Eth address</Text>
        <TextInput
          onChangeText={address => setAddress(address)}
          placeholder="Address"
          value={address}
          style={styles.textInput}
        />
        <Button title="Clear Address" onPress={() => setAddress("")} />
      </View>
      <View style={styles.addressContainer}>
        <Text>History</Text>
        <FlatList
          data={historyState}
          keyExtractor={(item, index) => index.toString()}
          inverted
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.button}
              onPress={() => clearAndSetAddress(item)}
            >
              <MonoText>{item}</MonoText>
            </TouchableHighlight>
          )}
        />
      </View>

      <View style={styles.addressContainer}>
        <Text>Try History</Text>
        <FlatList
          data={TRY_HISTORY}
          keyExtractor={(item, index) => index.toString()}
          inverted
          renderItem={({ item }) => (
            <TouchableHighlight
              style={styles.button}
              onPress={() => clearAndSetAddress(item)}
            >
              <MonoText>{item}</MonoText>
            </TouchableHighlight>
          )}
        />
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  textInput: {
    height: 40,
    width: "90%",
    padding: 10,
    borderColor: "#e3e3e3",
    borderWidth: 1
  },
  addressContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});
