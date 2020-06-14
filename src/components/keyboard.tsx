import React from "react";
import { Row, Col } from "antd";

import { NumericKey, DotKey, OperatorKey, ClearKey } from "./key";

const split = <T extends any>(arr: Array<T>, cols: number): T[][] => {
  const ret: T[][] = [];

  let i = 0;

  while (true) {
    ret.push(arr.slice(i, Math.min(i + cols, arr.length)));
    if (i + cols >= arr.length) break;
    i += cols;
  }

  return ret;
};

export const Keyboard = () => (
  <>
    {split(
      [
        <ClearKey />,
        <></>,
        <></>,
        <></>,
        <NumericKey number={7} />,
        <NumericKey number={8} />,
        <NumericKey number={9} />,
        <OperatorKey operator="/" />,
        <NumericKey number={4} />,
        <NumericKey number={5} />,
        <NumericKey number={6} />,
        <OperatorKey operator="*" />,
        <NumericKey number={1} />,
        <NumericKey number={2} />,
        <NumericKey number={3} />,
        <OperatorKey operator="-" />,
        <NumericKey number={0} />,
        <DotKey />,
        <OperatorKey operator="=" />,
        <OperatorKey operator="+" />
      ],
      4
    ).map((col, i) => (
      <Row key={i}>
        {col.map((node, i) => (
          <Col span={6} key={i}>
            {node}
          </Col>
        ))}
      </Row>
    ))}
  </>
);
