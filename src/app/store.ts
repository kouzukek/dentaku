import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import bignumber from "bignumber.js";

type NumericType = string;
export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type operator = "+" | "-" | "*" | "/" | "=";

export interface State {
  acc: NumericType;
  cur: NumericType;
  decimal: boolean;
  op?: operator;
  previous: "number" | "operator" | "equaled";
  display: string;
}

const pushDigit = (state: State, number: digit) => {
  if (state.decimal === false) {
    if (state.cur === "0") {
      state.cur = `${number}`;
    } else {
      state.cur = `${state.cur}${number}`;
    }
  } else {
    if (state.cur.includes(".")) {
      state.cur = `${state.cur}${number}`;
    } else {
      state.cur = `${state.cur}.${number}`;
    }
  }
};

const pushDot = (state: State) => {
  if (state.decimal === false) state.decimal = true;
};

const pushNumber = (state: State, func: () => void) => {
  if (state.previous === "equaled") {
    resetCur(state);
  }
  func();
  state.display = display(state.cur);
  state.previous = "number";
};

const equal = (state: State) => {
  switch (state.op) {
    case "+":
      state.cur = plus(state.acc, state.cur);
      break;
    case "-":
      state.cur = minus(state.acc, state.cur);
      break;
    case "*":
      state.cur = times(state.acc, state.cur);
      break;
    case "/":
      state.cur = devide(state.acc, state.cur);
      break;
  }
  state.acc = "0";
  state.decimal = false;
  state.display = display(state.cur);
};

const resetCur = (state: State) => {
  state.cur = "0";
  state.decimal = false;
};

const plus = (lhs: string, rhs: string) =>
  new bignumber(lhs).plus(new bignumber(rhs)).toString();

const minus = (lhs: string, rhs: string) =>
  new bignumber(lhs).minus(new bignumber(rhs)).toString();

const times = (lhs: string, rhs: string) =>
  new bignumber(lhs).times(new bignumber(rhs)).toString();

const devide = (lhs: string, rhs: string) =>
  new bignumber(lhs).dividedBy(new bignumber(rhs)).toString();

const display = (s: string) =>
  new bignumber(s).toFormat({ groupSeparator: ",", groupSize: 3, decimalSeparator: "." });

const initialize = (): State => ({
  acc: "0",
  cur: "0",
  decimal: false,
  op: undefined,
  previous: "equaled",
  display: "0",
});

export const dentaku = createSlice({
  name: "main",
  initialState: initialize(),
  reducers: {
    pushDigit: (state, { payload: number }: PayloadAction<digit>) =>
      pushNumber(state, () => pushDigit(state, number)),
    pushOperator: (state, { payload: operator }: PayloadAction<operator>) => {
      switch (operator) {
        case "+":
        case "-":
        case "*":
        case "/":
          if (state.op !== "=") equal(state);
          state.acc = state.cur;
          resetCur(state);
          state.previous = "operator";
          break;
        case "=":
          equal(state);
          state.previous = "equaled";
          break;
      }
      state.op = operator;
    },
    pushClear: () => initialize(),
    pushDot: (state) => pushNumber(state, () => pushDot(state)),
  },
});

export const store = configureStore({
  reducer: {
    dentaku: dentaku.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
