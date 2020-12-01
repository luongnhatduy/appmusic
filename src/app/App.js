import React from 'react';
import {Provider} from 'react-redux';

import AppStack from './AppStack.container';

import store from '@store';

export default () => {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
};
