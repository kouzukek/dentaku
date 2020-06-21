import { configureStore } from "@reduxjs/toolkit";

import { dentaku } from "./store";

const makeStore = () =>
  configureStore({
    reducer: {
      main: dentaku.reducer,
    },
  });

describe("", () => {
  let store: ReturnType<typeof makeStore>;
  beforeEach(() => {
    store = makeStore();
  });

  it("initial", () => {
    expect(store.getState().main.display).toBe("0");
  });

  it("[1] [+] [1] [=]", () => {
    store.dispatch(dentaku.actions.pushNumber(1));
    store.dispatch(dentaku.actions.pushOperator("+"));
    store.dispatch(dentaku.actions.pushNumber(1));

    store.dispatch(dentaku.actions.pushOperator("="));
    expect(store.getState().main.display).toBe("2");
  });

  it("[123.123] [+] [45.45] [=]", () => {
    store.dispatch(dentaku.actions.pushNumber(1));
    store.dispatch(dentaku.actions.pushNumber(2));
    store.dispatch(dentaku.actions.pushNumber(3));
    store.dispatch(dentaku.actions.pushDot());
    store.dispatch(dentaku.actions.pushNumber(1));
    store.dispatch(dentaku.actions.pushNumber(2));
    store.dispatch(dentaku.actions.pushNumber(3));

    store.dispatch(dentaku.actions.pushOperator("+"));

    store.dispatch(dentaku.actions.pushNumber(4));
    store.dispatch(dentaku.actions.pushNumber(5));
    store.dispatch(dentaku.actions.pushDot());
    store.dispatch(dentaku.actions.pushNumber(4));
    store.dispatch(dentaku.actions.pushNumber(5));

    store.dispatch(dentaku.actions.pushOperator("="));
    expect(store.getState().main.display).toBe("168.573");
  });

  it("[3] [-] [2] [=]", () => {
    store.dispatch(dentaku.actions.pushNumber(3));
    store.dispatch(dentaku.actions.pushOperator("-"));
    store.dispatch(dentaku.actions.pushNumber(2));

    store.dispatch(dentaku.actions.pushOperator("="));
    expect(store.getState().main.display).toBe("1");
  });

  it("[3] [*] [2] [=]", () => {
    store.dispatch(dentaku.actions.pushNumber(3));
    store.dispatch(dentaku.actions.pushOperator("*"));
    store.dispatch(dentaku.actions.pushNumber(2));

    store.dispatch(dentaku.actions.pushOperator("="));
    expect(store.getState().main.display).toBe("6");
  });

  it("[0.1] [*] [0.1] [=]", () => {
    store.dispatch(dentaku.actions.pushNumber(0));
    store.dispatch(dentaku.actions.pushDot());
    store.dispatch(dentaku.actions.pushNumber(1));
    store.dispatch(dentaku.actions.pushOperator("*"));
    store.dispatch(dentaku.actions.pushDot());
    store.dispatch(dentaku.actions.pushNumber(1));

    store.dispatch(dentaku.actions.pushOperator("="));
    expect(store.getState().main.display).toBe("0.01");
  });

  it("[3] [/] [2] [=]", () => {
    store.dispatch(dentaku.actions.pushNumber(3));
    store.dispatch(dentaku.actions.pushOperator("/"));
    store.dispatch(dentaku.actions.pushNumber(2));

    store.dispatch(dentaku.actions.pushOperator("="));
    expect(store.getState().main.display).toBe("1.5");
  });

});
