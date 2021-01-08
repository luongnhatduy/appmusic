import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';
import {actions as favoriteAction} from '@modules/favorite/store';

const {
  actions: {
    successGetListBanner,
    startGetListBanner,
    failGetListBanner,
    startGetListTop,
    successGetListTop,
    failGetListTop,
    successLikeSong,
    startLikeSong,
    failLikeSong,
    updateDataListSong,
  },
} = slice;

export const fetchListBanner = createOperation({
  actions: {
    startAction: startGetListBanner,
    successAction: successGetListBanner,
    failAction: failGetListBanner,
  },
  process: async ({payload, dispatch}) => {
    const result = await services.getListBanner();
    return result;
  },
});

export const fetchListTop = createOperation({
  actions: {
    startAction: startGetListTop,
    successAction: successGetListTop,
    failAction: failGetListTop,
  },
  process: async ({payload, dispatch, getState}) => {
    let dataProfile = getState().storage.dataProfile;
    const facebookId =
      dataProfile && dataProfile.facebookId
        ? dataProfile.facebookId
        : undefined;
    console.log(dataProfile, 'dataProfile', facebookId);
    const result = await services.getListTop(facebookId);
    console.log(result, 'result');
    return result;
  },
});

export const likeSong = createOperation({
  actions: {},
  process: async ({payload, dispatch, getState}) => {
    let dataProfile = getState().storage.dataProfile;
    const data = {
      accountId: dataProfile.facebookId,
      imgSong: payload.img,
      nameSong: payload.name_song,
      nameArtist: payload.name_singer,
      url: payload.link,
      songId: payload._id,
    };
    const song = await services.likeSong(data);
    if (
      song &&
      song.data &&
      song.data.status &&
      song.data.status === 'delete'
    ) {
      let newdata = [];
      console.log(song, 'song');
      newdata = getState().home.datalistTop;
      try {
        const songId = song.data._doc.songId.toString();
        console.log(songId, 'songId');
        const arrId = newdata.map(item => item._id);
        console.log(arrId, 'arrId', arrId.indexOf(songId));
        newdata[arrId.indexOf(songId)].statusLike = false;
        console.log(newdata, 'newdata');
        dispatch(updateDataListSong(newdata));
        dispatch(favoriteAction.updateListData(song));
      } catch (error) {}
    }
    if (
      song &&
      song.data &&
      song.data.status &&
      song.data.status === 'create'
    ) {
      let newdata = [];
      newdata = getState().home.datalistTop;
      try {
        const songId = song.data._doc.songId.toString();
        const arrId = newdata.map(item => item._id);
        newdata[arrId.indexOf(songId)].statusLike = true;
        dispatch(updateDataListSong(newdata));
        dispatch(favoriteAction.updateListData(song));
      } catch (error) {}
    }
  },
});
