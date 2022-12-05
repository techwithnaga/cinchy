import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  days: 0,
  startDate: new Date(),
  endDate: new Date(),
  startTime: 9 * 60 * 60 * 1000,
  endTime: 9 * 60 * 60 * 1000,
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
        days: state.days,
        startDate: state.startDate,
        endDate: state.endDate,
        startTime: state.startTime,
        endTime: state.endTime,
        motorGroupId: state.motorGroupId,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
