import React, {useMemo} from 'react';

import NavigationService from '@utils/NavigationService';
import AppStack from './AppStack';
import {useSelector} from 'react-redux';
import AppStackLogout from './AppStackLogout';

const AppStackContainer = props => {
  const {isLogged} = useSelector(state => state.storage);

  if (isLogged) {
    return (
      <AppStack
        {...props}
        ref={ref => NavigationService.setTopLevelNavigator(ref)}
      />
    );
  } else {
    return (
      <AppStackLogout
        {...props}
        ref={ref => NavigationService.setTopLevelNavigator(ref)}
      />
    );
  }
};

export default AppStackContainer;
