import "abortcontroller-polyfill";
import { CRYPTOCOMPARE_KEY } from "../constants/ApiKey";
import { SET_CURRENCIES_PRICE } from "../reducers/currencyPriceReducer";

export async function currencyPriceFetch(summary, dispatchCp) {
  if (summary) {
    const abortController = new AbortController();
    const currencies = Object.keys(summary.balances);

    if (currencies.length > 0) {
      const url = `https://min-api.cryptocompare.com/data/pricemulti?api_key=${CRYPTOCOMPARE_KEY}&tsyms=USD&fsyms=${currencies.join(
        ","
      )}`;
      const response = await fetch(url, abortController.signal);
      const data = await response.json();

      dispatchCp({ type: SET_CURRENCIES_PRICE, payload: data });
      return data;
    }
  }
}
