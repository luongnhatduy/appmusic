/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';

export default ({ message = {}, actions = {}, process = () => {} }) => payload => async (dispatch, getState) => {
  const execute = async () => {
    const { startAction, successAction, failAction } = actions;
    const { startMessage, successMessage, failMessage } = message;

    startAction && dispatch(startAction(payload));

    !!startMessage &&
      Alert.alert(
        startMessage,
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false }
      );

    try {
      const result = await process({ payload, dispatch, getState });
      successAction && dispatch(successAction({ result, params: payload }));

      !!successMessage &&
        Alert.alert(
          successMessage,
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false }
        );

      return result;
    } catch (error) {
      failAction && dispatch(failAction(error));

      !!failMessage &&
        Alert.alert(
          failMessage,
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false }
        );
      return error;
    }
  };

  return execute();
};
