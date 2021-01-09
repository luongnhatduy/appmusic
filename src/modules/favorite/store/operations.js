import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';

const {
  actions: {
    successGetListFavorite,
    startGetListFavorite,
    failGGetListFavorite,
    updateListDataFavorite,
  },
} = slice;

export const fetchListFavorite = createOperation({
  actions: {
    successAction: successGetListFavorite,
    startAction: startGetListFavorite,
    failAction: failGGetListFavorite,
  },
  process: async ({payload, dispatch, getState}) => {
    let dataProfile = getState().storage.dataProfile;
    const facebookId =
      dataProfile && dataProfile.facebookId
        ? dataProfile.facebookId
        : undefined;
    const result = await services.fetchListFavorite(facebookId);
    const listFavorite = result.map(item => {
      return {
        img: item.imgSong,
        link: item.url,
        name_singer: item.nameArtist,
        name_song: item.nameSong,
        statusLike: true,
        type: 'audio',
        _id: item.songId,
      };
    });
    console.log(listFavorite, ' listfavorite');
    return listFavorite;
  },
});

export const updateListData = createOperation({
  actions: {},
  process: async ({payload, dispatch, getState}) => {
    let newdata = [];
    newdata = getState().favorite.favoriteList;
    // console.log(newdata, 'newdata');
    // console.log(payload, 'payload');
    // console.log(payload.data.status, 'payload.data.status');
    try {
      if (
        payload &&
        payload.data &&
        payload.data.status &&
        payload.data.status === 'delete'
      ) {
        const songId = payload.data._doc.songId.toString();
        newdata = newdata.filter(item => item._id !== songId);
        // console.log(newdata, 'newfata');
        dispatch(updateListDataFavorite(newdata));
      }
      if (
        payload &&
        payload.data &&
        payload.data.status &&
        payload.data.status === 'create'
      ) {
        newdata = newdata.concat([
          {
            img: payload.data._doc.imgSong,
            link: payload.data._doc.url,
            name_singer: payload.data._doc.nameArtist,
            name_song: payload.data._doc.nameSong,
            statusLike: true,
            type: 'audio',
            _id: payload.data._doc.songId,
          },
        ]);
        // console.log(newdata, 'newfata');
        dispatch(updateListDataFavorite(newdata));
      }
    } catch (error) {}
    return;
  },
});
