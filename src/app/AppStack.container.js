import React, {useMemo} from 'react';

import NavigationService from '@utils/NavigationService';
import AppStack from './AppStack';

const AppStackContainer = props => {
  return useMemo(
    () => (
      <AppStack
        {...props}
        ref={ref => NavigationService.setTopLevelNavigator(ref)}
      />
    ),
    [props],
  );
};

export default AppStackContainer;
