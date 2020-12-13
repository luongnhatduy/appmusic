import createOperation from '@utils/createOperation';
import slice from './slice';
import * as services from './service';
import RNFS from 'react-native-fs';

const {
  actions: {startGetListMySong, successGetListMySong, failGetListMySong},
} = slice;

export const fetchListMySong = createOperation({
  actions: {
    startAction: startGetListMySong,
    successAction: successGetListMySong,
    failAction: failGetListMySong,
  },
  process: async ({payload, dispatch}) => {
    const result = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    const resultFilter = result.filter(
      item => item.name.slice(item.name.length - 3, item.name.length) === 'mp3',
    );

    const listdata = resultFilter.map(item => {
      const name_song = item.name
        .split('-')[0]
        .split('_')
        .join(' ');

      const name_singer = item.name
        .split('-')[1]
        .split('_')
        .join(' ');
      return {
        name_song: name_song,
        name_singer: name_singer.slice(0, name_singer.length - 4),
        type: 'audio',
        type_audio: 'offline',
        link: 'file://' + item.path,
      };
    });
    return listdata;
  },
});
