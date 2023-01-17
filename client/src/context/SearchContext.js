import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  subtotal: 0,
  deliveryDateInMillisecond: 0,
  returnDateInMillisecond: 0,
  // deliveryTime: 9 * 60 * 60 * 1000,
  // returnTime: 9 * 60 * 60 * 1000,
  phoneNumber: "",
  motorGroupId: "",
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        subtotal: state.subtotal,
        deliveryDateInMillisecond: state.deliveryDateInMillisecond,
        returnDateInMillisecond: state.returnDateInMillisecond,
        // deliveryTime: state.startTime,
        // returnTime: state.endTime,
        phoneNumber: state.phoneNumber,
        motorGroupId: state.motorGroupId,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
