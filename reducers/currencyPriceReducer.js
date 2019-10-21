export const SET_CURRENCIES_PRICE = "SET_CURRENCIES_PRICE";

export function currencyPriceReducer(state, action) {
  switch (action.type) {
    case SET_CURRENCIES_PRICE:
      return { ...state, ...action.payload };

    default:
      throw new Error();
  }
}
