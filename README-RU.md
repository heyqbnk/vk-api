[npm-badge]: https://img.shields.io/npm/v/vkontakte-api.svg
[npm-link]: https://npmjs.com/package/vkontakte-api

[<img src="https://i.imgur.com/uOIQBBR.png">](https://vk.com/dev)
# vkontakte-api [![NPM][npm-badge]][npm-link]

TypeScript библиотека призванная сделать выполнение запросов к API ВКонтакте 
простым. 

Документация: [EN](https://github.com/wolframdeus/vk-api/blob/master/README.md) / [RU](https://github.com/wolframdeus/vk-api/blob/master/README-RU.md)

## Установка
```bash
yarn add vkontakte-api
```
или
```bash
npm i vkontakte-api
```

## Описание

`vkontakte-api` следует концепции репозиториев, где каждый репозиторий
представляет собой отдельный класс и пространство имен в API. Главная задача
репозитория - отформатировать конфиг запроса для инстанса VKAPI таким образом,
чтобы тот мог выполнить корректный запрос и вернуть данные.

Каждый запрос добавляется в очередь и выполняется лишь после истечения
таймаута, вычисляемого на основе свойства `rps`. Таким образом, не возникает
ситуаций, когда токен был заблокирован ввиду слишком частой отправки запросов.

В библиотеке реализована мульти-поточная поддержка для тех проектов, которые
существуют в этом режиме.

## Использование

### Создание инстанса

Для начала необходимо создать инстанс `VKAPI`:
```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI;
```

При создании инстанса присутствует возможность указать свойство `rps` (равное 
`3` по умолчанию) которое означает `количество запросов в секунду`. API 
ВКонтакте имеет свои ограничения, поэтому убедитесь, что передаете корректное 
значение.

Дополнительно, имеется возможность передавать свойства `accessToken` и `lang`,
которые будут использованы как параметры по умолчанию для каждого последующего
запроса. Таким образом, нет необходимости указывать их каждый раз до тех пор,
пока их необходимо переопределить:

```typescript
const api = new VKAPI({
  rps: 20,
  accessToken: 'my default token',
  lang: 'en',
});
```

### Браузерный режим

Если вы используете `VKAPI` на браузерной стороне, то при создании инстанса 
вы можете указать свойства `isBrowser`, который равен `false` по умолчанию. В
случае, когда это значение `true`, инстанс выполняет запросы в режиме JSONP.
Использование этого режима не оказывает никакого влияния на внешний код. Если
это значение не указано, либо равно `false`, запросы будут выполняться в 
обычном режиме, вследствие чего будут падать из-за CORS ВКонтакте.

```typescript
const api = new VKAPI({isBrowser: true});
```

### Выполнение запросов

Инстанс `VKAPI` содержит список репозиториев которые генерируют параметры
для отправки в API. Каждый репозиторий имеет название исходя из своего имени
в [API](https://vk.com/dev/methods).

Простой пример отправки запроса и логирования данных:

```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my personal token'});

api.users.get({userIds: ['vladkibenko']}).then(console.log);
```

Отправка уведомления:

```typescript
api.notifications.sendMessage({
  userIds: ['vladkibenko'],
  message: 'Hello Vlad!',
});
```

Переопределение параметров `lang` и `accessToken` по умолчанию:

```typescript
import {ELang, VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my personal token'});

// Тут мы получение данные на английском языке от лица приложения.
api.users.get({
  userIds: ['vladkibenko'],
  accessToken: 'some application token',
  // Или мы могли просто использовать 'en' или 3.
  lang: ELang.EN,
}).then(console.log);
```

Некоторые методы или репозитории не описаны. Тем не менее, имеется возможность
выполнять кастомные запросы. **Убедитесь, что все поля `Params` и `Response` 
находятся в верблюжьем кейсинге потому что внутри `vkontakte-api` изменяет
их со змеиной в верблюжью для более простого использования**:

```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my token'});

// Описание параметров.
interface Params {
  cityIds: string;
}

// Описание ответа.
type Response = Array<{
  id: number;
  title: string;
}>;

// @see https://vk.com/dev/database.getCitiesById
api.addRequestToQueue<Params, Response>({
  method: 'database.getCitiesById',
  params: {
    cityIds: [1].join(','),
  },
}).then(console.log);
```

### Ошибки

Иногда API выбрасывает ошибки. Для того чтобы обнаружить случай, когда
ошибка была выброшена ВКонтакте, можно использовать функцию `isVKError`. Ошибка
содержит такие свойства как `errorInfo` содержащую все данные об ошибке и 
`config`, который содержит конфиг запроса использованный при отправке.  

Более того, библиотека содержит такой енум как `EErrors`, который описывает
список всех известных ошибок.

### Работа в мульти-поточном режиме

В случае, когда проект запушен в мульти-поточном режиме, необходимо 
использовать `VKAPIProvider` и `VKAPIConsumer`. `VKAPIProvider` должен быть 
использован в главном потоке, `VKAPIConsumer`-ы - во вторичных.

Пример использования:

```typescript
import {fork, isMaster, Worker} from 'cluster';
import os from 'os';
import {VKAPI, IVKAPI} from 'vkontakte-api';
import {VKAPIProvider, VKAPIConsumer} from 'vkontakte-api/dist/multithreading';

// Запусккает http сервер. Принимает объект являющийся IVKAPI.
function http(api: IVKAPI) {
  // Тут можно исопльзовать методы VKAPI.
  api.users.get({userIds: ['vladkibenko']}).then(console.log);
}

// Просто для примера. Используйте логику, которую считаете необходимой.
const isDev = process.env.NODE_ENV === 'development';

// В режиме разработки запускаем один поток, поэтому VKAPIProvider и
// VKAPIConsumer не нужны.
if (isDev) {
  const api = new VKAPI();
  
  // Запускает http сервер.
  return http(api);
}

// В продакшн режиме создается столько потоков, сколько поддерживает процессор.
if (isMaster) {
  const cpuCount = os.cpus().length;
  const workers: Worker[] = [];

  for (let i = 0; i < cpuCount; i++) {
    workers.push(fork());
  }

  // В главном потоке создаем VKAPIProvider и указываем свойство rps 
  // (это же свойство у VKAPIConsumer будет проигнорировано).
  const provider = new VKAPIProvider({workers});
  provider.init();
}
// Во вторичных потоках просто создаем сервер с инстансом VKAPIConsumer.
else {
  // Create VKAPI instance consumer instance.
  http(new VKAPIConsumer({
    instance: new VKAPI({accessToken: '...'}),
  }));
}
```

#### Создание связи между провайдером и консьюмером

Существует редкий кейс, когда проект содержит 2 провайдера для разных
инстансов `VKAPI`. Например, можно создать 2 различных инстанса `VKAPI` для
группы и приложения, которые используют разные токены.

В таком случае, вы можете указать свойство `tunnelName` как для провайдера,
так и для консьюмера. Вот как это выглядит:

```typescript
import {isMaster} from 'cluster'; 
import {VKAPI} from 'vkontakte-api';
import {VKAPIProvider, VKAPIConsumer} from 'vkontakte-api/dist/multithreading';

if (isMaster) {
  const cpuCount = os.cpus().length;
  const workers: Worker[] = [];

  for (let i = 0; i < cpuCount; i++) {
    workers.push(fork());
  }

  // Провайдер API для группы.
  const groupApiProvider = new VKAPIProvider({tunnelName: 'group', workers});
  groupApiProvider.init();

  // Провайдер API для приложения.
  const appApiProvider = new VKAPIProvider({tunnelName: 'app', workers});
  appApiProvider.init(); 
} else {
  // Создаем консьюмеры для инстансов.
  const groupApi = new VKAPIConsumer({
    tunnelName: 'group',
    instance: new VKAPI({accessToken: 'group access token'}),
  });
  const appApi = new VKAPIConsumer({
    tunnelName: 'app',
    instance: new VKAPI({accessToken: 'application access token'})
  });
}
``` 

## Реализованные методы
- [Database](https://vk.com/dev/database)
    - [getChairs](https://vk.com/dev/database.getChairs)
    - [getCities](https://vk.com/dev/database.getCities)
    - [getCitiesById](https://vk.com/dev/database.getCitiesById)
    - [getCountries](https://vk.com/dev/database.getCountries)
    - [getCountriesById](https://vk.com/dev/database.getCountriesById)
    - [getFaculties](https://vk.com/dev/database.getFaculties)
    - [getMetroStations](https://vk.com/dev/database.getMetroStations)
    - [getMetroStationsById](https://vk.com/dev/database.getMetroStationsById)
    - [getRegions](https://vk.com/dev/database.getRegions)
    - [getSchoolClasses](https://vk.com/dev/database.getSchoolClasses)
    - [getSchools](https://vk.com/dev/database.getSchools)
    - [getUniversities](https://vk.com/dev/database.getUniversities)
- [Messages](https://vk.com/dev/messages)
    - [send](https://vk.com/dev/messages.send)
- [Notifications](https://vk.com/dev/notifications)
    - [markAsViewed](https://vk.com/dev/notifications.markAsViewed)
    - [sendMessage](https://vk.com/dev/notifications.sendMessage)
- Specials
    - addStickers
    - getStickers
- StatEvents
    - addMiniAppsCustom
    - addMiniApps
- [Stats](https://vk.com/dev/stats)
    - [get](https://vk.com/dev/stats.get)
    - [getPostReach](https://vk.com/dev/stats.getPostReach)
    - [trackVisitor](https://vk.com/dev/stats.trackVisitor)
- [Storage](https://vk.com/dev/storage)
    - [get](https://vk.com/dev/storage.get)
    - [getKeys](https://vk.com/dev/storage.getKeys)
    - [set](https://vk.com/dev/storage.set)
- [Streaming](https://vk.com/dev/streaming)
    - [getServerUrl](https://vk.com/dev/streaming.getServerUrl)
    - [getSettings](https://vk.com/dev/streaming.getSettings)
    - [getStats](https://vk.com/dev/streaming.getStats)
    - [getStem](https://vk.com/dev/streaming.getStem)
    - [setSettings](https://vk.com/dev/streaming.setSettings)
- [Users](https://vk.com/dev/users)
    - [get](https://vk.com/dev/users.get)
    - [getFollowers](https://vk.com/dev/users.getFollowers)
    - [getSubscriptions](https://vk.com/dev/users.getSubscriptions)
    - [report](https://vk.com/dev/users.report)
    - [search](https://vk.com/dev/users.search)
- [Utils](https://vk.com/dev/utils)
    - [checkLink](https://vk.com/dev/utils.checkLink)
    - [deleteFromLastShortened](https://vk.com/dev/utils.deleteFromLastShortened)
    - [getLastShortenedLinks](https://vk.com/dev/utils.getLastShortenedLinks)
    - [getLinkStats](https://vk.com/dev/utils.getLinkStats)
    - [getServerTime](https://vk.com/dev/utils.getServerTime)
    - [getShortLink](https://vk.com/dev/utils.getShortLink)
    - [resolveScreenName](https://vk.com/dev/utils.resolveScreenName)
- [Widgets](https://vk.com/dev/widgets)
    - [getComments](https://vk.com/dev/widgets.getComments)
    - [getPages](https://vk.com/dev/widgets.getPages)