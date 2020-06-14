import {
  createSlice,
  configureStore,
  ThunkAction,
  Action,
  PayloadAction
} from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: { display: "" },
  reducers: {
    pushNumber: (state, { payload }: PayloadAction<number>) => {
      state.display = `${state.display}${payload}`;
    },
    pushOperator: (state, { payload }: PayloadAction<string>) => {
      if (payload === "=") state.display = eval(state.display);
      else state.display = `${state.display}${payload}`;
    },
    pushClear: state => {
      state.display = "";
    },
    pushDot: state => {}
  }
});

export const store = configureStore({
  reducer: {
    main: mainSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
