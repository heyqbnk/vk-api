import {VKAPI} from '../src/VKAPI';

(async () => {
  const api = new VKAPI();

  const data = await api
    .users.get({
      accessToken: '0e49dfc20e49dfc20e49dfc2ff0e3b825c00e490e49dfc2509ffb2b75a110c4a2ca9cb0',
      userIds: [68728796],
      lang: 'ru'
    });

  console.log(data);
})();
