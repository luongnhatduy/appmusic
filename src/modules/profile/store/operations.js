import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
const {
  actions: {successLogin},
} = slice;
import {useSelector, useDispatch} from 'react-redux';
import {actions as profileAction} from '@modules/profile/store';
import {actions as storageAction} from '@modules/storage/store';

export const login = createOperation({
  actions: {
    successAction: successLogin,
  },
  process: async ({payload, dispatch, getState}) => {
    await LoginManager.logOut();
    // Linking.openURL('https://98351aef5a01.ngrok.io/auth/facebook');
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            if (data.accessToken) {
              console.log(data.accessToken, 'token');
              getInfoFromToken(data.accessToken.toString(), dispatch);
            }
          });
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  },
});

export const getInfoFromToken = (token, dispatch) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string:
        'id, name, first_name, last_name, birthday, email, picture.type(large)',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    {token, parameters: PROFILE_REQUEST_PARAMS},
    async (error, result) => {
      if (error) {
        console.log('Login Info has an error:', error);
      } else {
        console.log('result', result);
        const data = {
          facebookId: result.id,
          name: result.name,
          urlImg: result.picture.data.url,
        };
        const account = await services.login(data);
        console.log(account, 'account');
        if (account && account.data) {
          dispatch(storageAction.setDataProfile(data));
          dispatch(storageAction.setIsLogged(true));
        }
        if (result.isCancelled) {
          console.log('Login cancelled');
        }
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};
