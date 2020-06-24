import React from "react";
import { Row, Col } from "antd";
import { chunk } from "lodash";

import { NumericKey, DotKey, OperatorKey, ClearKey, EqualKey } from "./key";

export const Keyboard = () => (
  <>
    {chunk(
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
        <EqualKey />,
        <OperatorKey operator="+" />,
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
