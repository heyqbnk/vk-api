import {VKAPI} from '../src/VKAPI';

(async () => {
  const api = new VKAPI();

  const data = await api.users.get({
    userIds: [68728796, 132283998],
    accessToken: '8332d2778332d2778332d27797835d3401883328332d277dd6101ee5bf205174987aabe'
  });

  console.log(data);
})();
