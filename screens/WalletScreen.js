import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
  FlatList,
  TouchableHighlight,
  RefreshControl
} from "react-native";
import { MonoText } from "../components/StyledText";
import { useFetchTxsOperations } from "../hooks/fetchTxsHook";
import {
  formatValue,
  getSummaryByDate,
  getSummaryFromDate
} from "../utils/ledgerEthUtils";
import { Balance } from "../components/Balance";
import { BaseModal } from "../components/BaseModal";
import { currencyPriceReducer } from "../reducers/currencyPriceReducer";
import { currencyPriceFetch } from "../services/currencyPriceService";

export default function WalletScreen(props) {
  const address = props.navigation.getParam("address");
  const [
    operations,
    isLoading,
    refreshOperations,
    setRefreshOperations
  ] = useFetchTxsOperations(address);
  const [summary, setSummary] = useState({});
  const [summaryDate, setSummaryDate] = useState({});
  const [transactionsFilter, setTransactionsFilter] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [cpState, dispatchCp] = useReducer(currencyPriceReducer, {});

  /*
   ** For Pull and Refresh
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshOperations(true);
  }, [refreshing]);

  useEffect(() => {
    if (!refreshOperations) {
      setRefreshing(false);
    }
  }, [refreshOperations]);
  /**
   * End here
   */
  useEffect(() => {
    if (operations.length > 0) {
      const tmpSummaryDate = getSummaryByDate(operations);
      setSummaryDate(tmpSummaryDate);
      const tmpSummary = getSummaryFromDate(tmpSummaryDate);
      setSummary(tmpSummary);
      currencyPriceFetch(tmpSummary, dispatchCp);
    }
  }, [operations]);

  const getCurrencyUSDValue = (symbol, value) => {
    return cpState[symbol]
      ? String((cpState[symbol]["USD"] * value).toFixed(2)) + " $"
      : "-- $";
  };

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <MonoText>{address}</MonoText>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : operations.length === 0 ? (
    <View style={styles.loadingContainer}>
      <MonoText>{address}</MonoText>
      <Text>No transaction was found</Text>
    </View>
  ) : (
    <ScrollView
      style={styles.defaultContainer}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.defaultContainer}>
        <MonoText>{address}</MonoText>
      </View>
      <View style={styles.defaultContainer}>
        <Balance
          symbol="ETH"
          balance={
            summary.balances.ETH
              ? formatValue(summary.balances.ETH, summary.tokensMagnitude.ETH)
              : 0
          }
        />
      </View>

      <FlatList
        style={styles.defaultContainer}
        data={Object.keys(summary.balances)}
        renderItem={({ item }) =>
          summary.balances[item] > 0 && (
            <TouchableHighlight
              style={styles.button}
              onPress={() => setTransactionsFilter(item)}
            >
              <>
                <MonoText style={{ fontSize: 16, flex: 1 }}>{item}</MonoText>
                <Text style={{ flex: 2 }}>
                  {getCurrencyUSDValue(
                    item,
                    formatValue(
                      summary.balances[item],
                      summary.tokensMagnitude[item]
                    )
                  )}
                </Text>
                <Text style={{ flex: 3 }}>
                  {formatValue(
                    summary.balances[item],
                    summary.tokensMagnitude[item]
                  )}
                </Text>
              </>
            </TouchableHighlight>
          )
        }
        keyExtractor={item => item}
      />

      {transactionsFilter.length > 0 && (
        <BaseModal
          isVisible={transactionsFilter.length > 0}
          closeText="Close Modal"
          closeModal={() => setTransactionsFilter("")}
        >
          <FlatList
            data={Object.keys(summaryDate.balances)
              .filter(symbol => symbol.includes(transactionsFilter))
              .sort()
              .reverse()}
            ListHeaderComponent={() => (
              <Balance
                symbol={transactionsFilter}
                balance={formatValue(
                  summary.balances[transactionsFilter],
                  summary.tokensMagnitude[transactionsFilter]
                )}
              />
            )}
            renderItem={({ item }) => (
              <View>
                <MonoText style={{ fontSize: 16 }}>
                  {item.split("_")[1]}
                </MonoText>
                <Text style={{ flex: 1 }}>
                  {getCurrencyUSDValue(
                    item.split("_")[0],
                    formatValue(
                      summaryDate.balances[item],
                      summaryDate.tokensMagnitude[item]
                    )
                  )}
                </Text>
                <Text
                  style={
                    summaryDate.balances[item] > 0 ? styles.inOp : styles.outOp
                  }
                >
                  {formatValue(
                    summaryDate.balances[item],
                    summaryDate.tokensMagnitude[item]
                  )}
                </Text>
              </View>
            )}
            keyExtractor={item => item}
          />
        </BaseModal>
      )}
    </ScrollView>
  );
}

WalletScreen.navigationOptions = {
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  defaultContainer: {
    flex: 1
  },
  biggerContainer: {
    flex: 3
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inOp: {
    color: "green",
    flex: 2
  },
  outOp: {
    color: "red",
    flex: 2
  }
});
