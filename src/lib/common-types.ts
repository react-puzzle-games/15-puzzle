export type TileDescriptor = {
  row: number;
  column: number;
  left: number;
  top: number;
  tileId: number;
  number?: number;
  width?: number;
  height?: number;
};

export type TileAdjancency = {
  neighbours: boolean;
  distance: {
    rows: number;
    columns: number;
  };
};
