import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";

import { mainSlice } from "../app/store";

export const NumericKey: React.FC<{ number: number }> = ({ number }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(mainSlice.actions.pushNumber(number));
  };
  return (
    <Button onClick={onClick} style={{ width: "100%" }}>
      {number}
    </Button>
  );
};

export const DotKey: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(mainSlice.actions.pushDot());
  };
  return (
    <Button onClick={onClick} style={{ width: "100%" }}>
      .
    </Button>
  );
};

export const ClearKey: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(mainSlice.actions.pushClear());
  };
  return (
    <Button onClick={onClick} style={{ width: "100%" }}>
      C
    </Button>
  );
};

export const OperatorKey: React.FC<{ operator: string }> = ({ operator }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(mainSlice.actions.pushOperator(operator));
  };
  return (
    <Button onClick={onClick} style={{ width: "100%" }}>
      {operator}
    </Button>
  );
};

export const DummyKey: React.FC<{ text: string }> = ({ text }) => {
  return <Button style={{ width: "100%" }}>{text}</Button>;
};
