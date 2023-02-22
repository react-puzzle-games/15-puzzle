import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  root: ({ width, height, correct, left, top, visible }: Props) => ({
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

type Props = {
  tileId: number;
  number: number;
  onClick: (props: Props) => void;
  width: number;
  height: number;
  correct: boolean;
  left: number;
  top: number;
  visible?: boolean;
};

const Tile = (props: Props) => {
  const { number = 0, onClick } = props;
  const styles = useStyles(props);

  return (
    <div className={styles.root} onClick={() => onClick(props)}>
      <span className={styles.tileNumber}>{number}</span>
    </div>
  );
};

export default Tile;
