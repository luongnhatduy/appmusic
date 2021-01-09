import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';
import moment from 'moment';

const {
  actions: {
    commentSuccess,
    startGetListFavorite,
    successGetListFavorite,
    failGetListFavorite,
    setDataComments,
  },
} = slice;

export const sendComment = createOperation({
  actions: {successAction: commentSuccess},
  process: async ({payload, dispatch, getState}) => {
    console.log('send');

    let dataProfile = getState().storage.dataProfile;
    let songplaying = getState().storage.songplaying;
    let listComment = getState().musicdisplay.comments;
    const data = {
      accountId: dataProfile.facebookId,
      songId: songplaying._id,
      text: payload,
      createdAt: moment().format(),
    };
    const commentPendding = {
      ...data,
      user: dataProfile,
    };
    dispatch(setDataComments(listComment.concat([commentPendding])));
    const result = await services.sendComment(data);
    dispatch(setDataComments([]));
    if (result)
      dispatch(
        setDataComments(
          listComment.concat([{...result.data[0], user: dataProfile}]),
        ),
      );
  },
});

export const deleteComment = createOperation({
  actions: {},
  process: async ({payload, dispatch, getState}) => {
    console.log('delete');
    let listComment = getState().musicdisplay.comments;
    dispatch(
      setDataComments(listComment.filter(item => item._id !== payload._id)),
    );
    const result = await services.deleteComment({id: payload._id});
    console.log(result, 'result');
  },
});

export const fetchComment = createOperation({
  actions: {
    startAction: startGetListFavorite,
    successAction: successGetListFavorite,
    failAction: failGetListFavorite,
  },
  process: async ({payload, dispatch, getState}) => {
    let dataProfile = getState().storage.dataProfile;
    let songplaying = getState().storage.songplaying;

    const result = await services.fetchComment(songplaying._id);
    return result.data.map(item => {
      return {
        ...item.item,
        user: item.user,
      };
    });
  },
});
