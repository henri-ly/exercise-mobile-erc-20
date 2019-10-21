import "abortcontroller-polyfill";
import { useState, useEffect } from "react";
import { fetchTxs, txsToOperations } from "../utils/ledgerEthUtils";

export function useFetchTxsOperations(address) {
  const [isLoading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);
  const [refreshOperations, setRefreshOperations] = useState(true);

  async function fetchData(abortController) {
    if (refreshOperations) {
      const txsTmp = await fetchTxs(address, abortController);
      if (!txsTmp || txsTmp === undefined || txsTmp.length === 0) return;
      const operationsTmp = txsToOperations(txsTmp, address);

      setOperations(operationsTmp);
      setLoading(false);
      setRefreshOperations(false);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);

    return () => {
      abortController.abort();
    };
  }, [refreshOperations]);

  return [operations, isLoading, refreshOperations, setRefreshOperations];
}
