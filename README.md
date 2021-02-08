[npm-badge]: https://img.shields.io/npm/v/vkontakte-api.svg
[npm-link]: https://npmjs.com/package/vkontakte-api

[<img src="https://i.imgur.com/uOIQBBR.png">](https://vk.com/dev)
# vkontakte-api [![NPM][npm-badge]][npm-link]

TypeScript library to make requests performing to VK API simple. 

Docs: [EN](https://github.com/wolframdeus/vk-api/blob/master/README.md) / [RU](https://github.com/wolframdeus/vk-api/blob/master/README-RU.md)

## Installation
```bash
yarn add vkontakte-api
```
or
```bash
npm i vkontakte-api
```

## Description

`vkontakte-api` follows repositories based concept where each repository is a 
class and represents some namespace in API. The main purpose of repository
is to format request config for VKAPI instance, so it could perform request
and return data.

Each request is added to queue and executed only after timeout calculated
according to `rps` property. So, there is no case when you were 
banned due to sending too many requests per second.

There is a multi-thread (multi-workers) support for those projects which are
launched in this mode.  

## Usage

### Creating instance

Firstly, it is required to create `VKAPI` instance:
```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI;
``` 

It is allowed to pass `rps` (which is `3` by default) property which means 
`requests per second`. VK API has its restriction, so make sure you have 
passed correct value. 

Additionally, you can pass properties `accessToken` and `lang` which will be 
used as default parameters for each request. So, you have no need to pass them
each time until overriding is needed:

```typescript
const api = new VKAPI({
  rps: 20,
  accessToken: 'my default token',
  lang: 'en',
});
```

### Browser mode

If you are using `VKAPI` on browser side, you could use property `isBrowser`
which is `false` by default. In case, this value is `true`, api instance
performs requests in JSONP callback mode. It does not make any influence on
external code flow. If this value is not passed, requests will be executed
in usual mode and on the browser side they will fail due to VK's CORS.

```typescript
const api = new VKAPI({isBrowser: true});
```

### Performing requests

VKAPI instance contains a list of repositories which generate request parameters
to send to API. Each repository has a name according to its name in 
[API](https://vk.com/dev/methods).

Simple example of sending request and logging data:
```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my personal token'});

api.users.get({userIds: ['vladkibenko']}).then(console.log);
```

Sending some notification:
```typescript
api.notifications.sendMessage({
  userIds: ['vladkibenko'],
  message: 'Hello Vlad!',
});
```

Overriding default `lang` and `accessToken`:
```typescript
import {ELang, VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my personal token'});

// Here we will get english-localized data on behalf of on app.
api.users.get({
  userIds: ['vladkibenko'],
  accessToken: 'some application token',
  // Or you could just use 'en' or 3.
  lang: ELang.EN,
}).then(console.log);
```

Some methods or repositories are still not implemented. Nevertheless, you are 
free to perform custom requests. **Make sure, all of `Params` and `Response` 
fields are camel cased, because internally, `vkontakte-api` moves them from 
snake to camel case for easier usage**:

```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my token'});

// Description of parameters.
interface Params {
  cityIds: string;
}

// Description of response.
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

### Errors

Sometimes, API throws errors. To detect if error was thrown by VK, you could
use function `isVKError`. It contains such properties as `errorInfo` which 
contains all error data from VK and `config` which was used to perform request.

Moreover, lib contains enum `EErrors` which is a set of all known errors.

### Multi-threading support

In case your project is ran in multi cluster mode, you could use `VKAPIProvider`
and `VKAPIConsumer`.

`VKAPIProvider` should be used in a main thread and `VKAPIConsumer`s in slave
threads. 

Here is simple example:
```typescript
import {fork, isMaster, Worker} from 'cluster';
import os from 'os';
import {VKAPI, IVKAPI} from 'vkontakte-api';
import {VKAPIProvider, VKAPIConsumer} from 'vkontakte-api/dist/multithreading';

// Runs http server. Accepts an object which looks like VKAPI instance. So,
// he does not know what api exactly is. It could be real VKAPI instance or
// VKAPIConsumer.
function http(api: IVKAPI) {
  // Here we can use all of the VKAPI methods
  api.users.get({userIds: ['vladkibenko']}).then(console.log);
}

// Just a stub. You can use the logic you need
const isDev = process.env.NODE_ENV === 'development';

// In development mode, let us run single thread. So, no VKAPIProvider and
// VKAPIConsumer are needed.
if (isDev) {
  const api = new VKAPI();
  
  // Run http server
  return http(api);
}

// In production mode, we do create as many forks as processor support.
if (isMaster) {
  const cpuCount = os.cpus().length;
  const workers: Worker[] = [];

  for (let i = 0; i < cpuCount; i++) {
    workers.push(fork());
  }

  // In master we create VKAPIProvider with specified rps property 
  // (VKAPIConsumer api instance rps will be ignored). If not passed, rps will 
  // be 3, so make sure you have passed that property.
  const provider = new VKAPIProvider({workers});
  provider.init();
} 
// In slaves, we just create http server with VKAPIConsumer.
else {
  // Create VKAPI instance consumer instance.
  http(new VKAPIConsumer({
    instance: new VKAPI({accessToken: '...'}),
  }));
}
```

#### Defining connection between the provider and consumer

There is a rare case, when your project contains 2 providers with for 
different `VKAPI` instances. For example, you could create separate api 
instances for group and application which use different access tokens.

So then, it is allowed to pass same property `tunnelName` for both provider and 
consumer. Here is how it works:

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

  // API provider for group API instance
  const groupApiProvider = new VKAPIProvider({tunnelName: 'group', workers});
  groupApiProvider.init();

  // API provider for VK Mini Apps application API instance
  const appApiProvider = new VKAPIProvider({tunnelName: 'app', workers});
  appApiProvider.init(); 
} else {
  // Create API instance consumers
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

## Implemented methods
- [Account](https://vk.com/dev/account)
    - [ban](https://vk.com/dev/account.ban)
    - [changePassword](https://vk.com/dev/account.changePassword)
    - [getActiveOffers](https://vk.com/dev/account.getActiveOffers)
    - [getAppPermissions](https://vk.com/dev/account.getAppPermissions)
    - [getBanned](https://vk.com/dev/account.getBanned)
    - [getCounters](https://vk.com/dev/account.getCounters)
    - [getInfo](https://vk.com/dev/account.getInfo)
    - [getProfileInfo](https://vk.com/dev/account.getProfileInfo)
    - [getPushSettings](https://vk.com/dev/account.getPushSettings)
    - [registerDevice](https://vk.com/dev/account.registerDevice)
    - [saveProfileInfo](https://vk.com/dev/account.saveProfileInfo)
    - [setInfo](https://vk.com/dev/account.setInfo)
    - [setNameInMenu](https://vk.com/dev/account.setNameInMenu)
    - [setOffline](https://vk.com/dev/account.setOffline)
    - [setOnline](https://vk.com/dev/account.setOnline)
    - [setPushSettings](https://vk.com/dev/account.setPushSettings)
    - [setSilenceMode](https://vk.com/dev/account.setSilenceMode)
    - [unban](https://vk.com/dev/account.unban)
    - [unregisterDevice](https://vk.com/dev/account.unregisterDevice)
- [Auth](https://vk.com/dev/auth)
    - [restore](https://vk.com/dev/auth.restore)
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
- [Donut](https://vk.com/dev/donut)
    - [getFriends](https://vk.com/dev/donut.getFriends)
    - [getSubscription](https://vk.com/dev/donut.getSubscription)
    - [getSubscriptions](https://vk.com/dev/donut.getSubscriptions)
    - [isDon](https://vk.com/dev/donut.isDon)
- [DownloadedGames](https://vk.com/dev/downloadedGames)
    - [getPaidStatus](https://vk.com/dev/downloadedGames.getPaidStatus)
- [Gifts](https://vk.com/dev/gifts)
    - [get](https://vk.com/dev/gifts.get)
- [Likes](https://vk.com/dev/likes)
    - [add](https://vk.com/dev/likes.add)
    - [delete](https://vk.com/dev/likes.delete)
    - [getList](https://vk.com/dev/likes.getList)
    - [isLiked](https://vk.com/dev/likes.isLiked)
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
- [Status](https://vk.com/dev/status)
    - [get](https://vk.com/dev/status.get)
    - [set](https://vk.com/dev/status.set)
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