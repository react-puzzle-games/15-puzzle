import React from 'react';

import { tile as tileConstants } from './constants';

const styles = {
  width: tileConstants.width * tileConstants.count,
  height: tileConstants.height * tileConstants.count,
  border: '1px solid #FFAAAA',
  position: 'relative',
};

export default ({ children }) => (
  <div style={styles}>{children}</div>
);
