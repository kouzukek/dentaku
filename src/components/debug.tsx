import React from "react";
import { useSelector } from "react-redux";

export const Debug = () => {
  const state = useSelector((state) => state.main);
  return <pre>{JSON.stringify(state, null, 4)}</pre>;
};
