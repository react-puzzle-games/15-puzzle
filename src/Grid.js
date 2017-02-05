import React from 'react';

import { tile as tileConstants } from './constants';

const styles = {
  width: tileConstants.width * 4,
  height: tileConstants.height * 4,
  border: '1px solid #FFAAAA',
  position: 'relative',
};

export default ({ children }) => (
  <div style={styles}>{children}</div>
);
