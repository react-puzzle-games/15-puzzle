import React from "react";

const styles = {
  width: 360,
  height: 360,
  position: "relative"
};

export default ({ children }) => <div style={styles}>{children}</div>;
