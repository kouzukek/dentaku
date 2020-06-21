import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import bignumber from "bignumber.js";

type NumericType = string;
export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type operator = "+" | "-" | "*" | "/" | "=";

export interface State {
  acc: NumericType;
  cur: NumericType;
  decimal: boolean;
  op: operator;
  previous: "number" | "operator" | "equaled";
  display: string;
}

const pushNumber2Cur = (state: State, number: digit) => {
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

const initialize = (): State => ({
  acc: "0",
  cur: "0",
  decimal: false,
  op: "=",
  previous: "equaled",
  display: "0",
});

export const dentaku = createSlice({
  name: "main",
  initialState: initialize(),
  reducers: {
    pushNumber: (state, { payload: number }: PayloadAction<digit>) => {
      pushNumber2Cur(state, number);
      state.display = state.cur;
      state.previous = "number";
    },
    pushOperator: (state, { payload: operator }: PayloadAction<operator>) => {
      switch (operator) {
        case "+":
        case "-":
        case "*":
        case "/":
          state.acc = state.cur;
          resetCur(state);
          break;
        case "=":
          switch (state.op) {
            case "+":
              state.cur = plus(state.acc, state.cur);
              state.acc = "0";
              state.display = state.cur;
              break;
            case "-":
              state.cur = minus(state.acc, state.cur);
              state.acc = "0";
              state.display = state.cur;
              break;
            case "*":
              state.cur = times(state.acc, state.cur);
              state.acc = "0";
              state.display = state.cur;
              break;
            case "/":
              state.cur = devide(state.acc, state.cur);
              state.acc = "0";
              state.display = state.cur;
              break;
          }
          break;
      }
      state.op = operator;
      state.previous = "operator";
    },
    pushClear: () => initialize(),
    pushDot: (state) => {
      pushDot(state);
      state.display = state.cur;
      state.previous = "number";
    },
  },
});

export const store = configureStore({
  reducer: {
    main: dentaku.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
