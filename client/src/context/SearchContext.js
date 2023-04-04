import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  subtotal: 0,
  UTCDeliveryDateTimeInString: "",
  UTCReturnDateTimeInString: "",
  localDeliveryDateTimeInMs: 0,
  localReturnDateTimeInMs: 0,
  UTCDeliveryDateTimeInMs: 0,
  UTCReturnDateTimeInMs: 0,
  phoneNumber: "",
  motorGroupId: "",
  rentalDuration: 0,
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
        UTCDeliveryDateTimeInString: state.UTCDeliveryDateTimeInString,
        UTCReturnDateTimeInString: state.UTCReturnDateTimeInString,
        localDeliveryDateTimeInMs: state.localDeliveryDateTimeInMs,
        localReturnDateTimeInMs: state.localReturnDateTimeInMs,
        phoneNumber: state.phoneNumber,
        motorGroupId: state.motorGroupId,
        rentalDuration: state.rentalDuration,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
