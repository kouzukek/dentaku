import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { dentaku, digit, operator } from "../app/store";

const style = {
  width: "100%",
};

export const NumericKey: React.FC<{ number: digit }> = ({ number }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(dentaku.actions.pushDigit(number));
  };
  return (
    <Button onClick={onClick} style={style}>
      {number}
    </Button>
  );
};

export const DotKey: React.FC = () => {
  const disabled = useSelector((state) => state.dentaku.decimal);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(dentaku.actions.pushDot());
  };
  return (
    <Button onClick={onClick} style={style} type={disabled ? "primary" : undefined}>
      .
    </Button>
  );
};

export const ClearKey: React.FC = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(dentaku.actions.pushClear());
  };
  return (
    <Button onClick={onClick} style={style}>
      C
    </Button>
  );
};

export const OperatorKey: React.FC<{ operator: operator }> = ({ operator }) => {
  const primary = useSelector((state) => state.dentaku.op) === operator;
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(dentaku.actions.pushOperator(operator));
  };
  return (
    <Button onClick={onClick} style={style} type={primary ? "primary" : undefined}>
      {operator}
    </Button>
  );
};

export const EqualKey: React.FC = () => {
  const primary = useSelector((state) => state.dentaku.mode) === "equaled";
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(dentaku.actions.pushEqual());
  };
  return (
    <Button onClick={onClick} style={style} type={primary ? "primary" : undefined}>
      =
    </Button>
  );
};

export const DummyKey: React.FC<{ text: string }> = ({ text }) => {
  return <Button style={{ width: "100%" }}>{text}</Button>;
};
