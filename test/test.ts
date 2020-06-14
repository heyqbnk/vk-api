import {VKAPI} from '../src/VKAPI';

(async () => {
  const api = new VKAPI();

  const data = await api.messages
    .send({
      accessToken: '532ececd80c10c0d1729b58e9777ee063133b5db18db820d02db6c94b1ff008866cdd51010eed4ab29660',
      userId: 68728796,
      randomId: Math.random() * 1000000,
      message: 'OOOoook!',
      keyboard: {
        inline: true,
        buttons: [
          [{
            action: {
              type: 'open_app',
              appId: 7495070,
              payload: '',
              label: 'Чек-листы',
              hash: '',
            },
          }],
        ],
      },
    });

  console.log(data);
})();
