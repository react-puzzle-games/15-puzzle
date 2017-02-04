import React from 'react';

const styles = {
  width: 200,
  height: 200,
  border: '1px solid cyan',
  position: 'relative',
};

export default ({ children }) => (
  <div style={styles}>{children}</div>
);
