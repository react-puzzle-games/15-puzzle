// @ts-check

import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  root: ({ width, height, correct, left, top, visible }) => ({
    display: visible ? "flex" : "none",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    border: "1px solid #FFD1AA",
    width,
    height,
    left,
    top,
    cursor: "pointer",
    backgroundColor: correct ? "#226666" : "#D4726A",
    transitionProperty: "top, left, background-color",
    transitionDuration: ".300s",
    transitionTimingFunction: "ease-in",
  }),

  tileNumber: {
    color: "#FFD1AA",
    fontSize: "1.8em",
    userSelect: "none",
  },
});

const Tile = (props) => {
  const { number = 0, onClick } = props;
  const styles = useStyles(props);

  return (
    <div className={styles.root} onClick={() => onClick(props)}>
      <span className={styles.tileNumber}>{number}</span>
    </div>
  );
};

export default Tile;
