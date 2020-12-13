import {NavigationActions, StackActions} from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName, params})],
    }),
  );
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

export default {
  goBack,
  reset,
  navigate,
  setTopLevelNavigator,
};
