import React from "react";
import { useSelector } from "react-redux";

export const Display = () => {
  const display = useSelector((state) => state.dentaku.display);
  return (
    <div
      style={{
        textAlign: "right",
        paddingRight: "3px",
      }}
    >
      &nbsp;{display}
    </div>
  );
};
