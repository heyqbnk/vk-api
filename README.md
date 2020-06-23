[npm-badge]: https://img.shields.io/npm/v/vkontakte-api.svg
[npm-link]: https://npmjs.com/package/vkontakte-api

[<img src="https://i.imgur.com/uOIQBBR.png">](https://vk.com/dev)
# vkontakte-api [![NPM][npm-badge]][npm-link]

TypeScript library to make requests performing to VK API simple

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
is to format request config for VKAPI instance, so he could perform request
and return data.

Each request is added to queue and executed only after timeout, calculated
according to `rps` property, is elapsed. So, there is no case when you were 
banned due to sending too many requests per second.

There is a multi-thread (multi-workers) support for those projects which are
launched in this mode.  

## Usage

### Creating instance
First, it is required to create `VKAPI` instance:
```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI();
``` 

It is allowed to pass `rps` property which means `requests per second`. VK
API has its restriction, so make sure you have passed correct value. 

Additionally, you can pass properties `accessToken` and `lang` which will be 
used as default parameters for each request. So, you have no need to pass them
each time until overriding is needed. 

Here is how it looks like:
```typescript
const api = new VKAPI({
  rps: 20,
  accessToken: 'my default token',
  lang: 'uk',
});
```

### Browser mode

If you are using `VKAPI` on browser side, you could use property `isBrowser`
which is `false` by default. In case, this value is `true`, api instance
performs requests in JSONP callback mode. It does not make any influence on
outer code flow. If this value is not passed, requests will be executed
in usual mode, by on the browser side they will fail due to VK's CORS.

```typescript
const api = new VKAPI({isBrowser: true});
```

### Performing requests

VKAPI instance contains a list of repositories which generate request parameters
to send to API. Each repository is named according to its name in 
[API](https://vk.com/dev/methods).

Simple example of sending request and logging data:
```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI();

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
import {LangEnum, VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my personal user token'});

// Here we will get english-localized data from some application's face
api.users.get({
  userIds: ['vladkibenko'],
  accessToken: 'some application token',
  // Or you could just use 'uk' or 1
  lang: LangEnum.UK,
}).then(console.log);
```

Some of methods are not currently typed or realised. So, you are free to perform
custom requests. **Make sure, all of `Params` and `Response` fields are camel 
cased, because internally, `vkontakte-api` moves them from snake to camel 
case for easier usage**:

```typescript
import {VKAPI} from 'vkontakte-api';

const api = new VKAPI({accessToken: 'my token'});

// Description of parameters
interface Params {
  cityIds: string;
}

// Description of response
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
use function `isVKError` which detects if error is `VKError`. It contains
property `data` which contains all error data (it is typed, by the way).

Moreover, lib contains enum `ErrorsEnum` which is a set of all known errors.

### Multi-threading support

In case your project is ran in multi cluster mode, you could use `VKAPIProvider`
and `VKAPIConsumer`.

`VKAPIProvider` should be used in main thread. To create its instance, it is 
required to pass `VKAPI` instance which will perform all of the requests and
list of workers, containing `VKAPIConsumer` which should communicate with 
`VKAPIProvider`.

With this scheme we are getting single `VKAPI` instance for project and
not overflowing API restriction connected with requests per second. 

You can find more complex example [here](https://github.com/wolframdeus/backend-template/blob/master/src/index.ts).

Here is example:
```typescript
import {fork, isMaster, Worker} from 'cluster';
import os from 'os';
import {VKAPI, VKAPIProvider, VKAPIConsumer, VKAPIInterface} from 'vkontakte-api';

// Runs http server. Accepts an object which looks like VKAPI instance. So,
// he does not know what api exactly is. It could be real VKAPI instance or
// VKAPIConsumer
function http(api: VKAPIInterface) {
  // Here we can use all of the VKAPI methods
  api.users.get({userIds: ['vladkibenko']}).then(console.log);
}

// Just a stub. You can use the logic you need
const isDev = process.env.NODE_ENV === 'development';

// In development mode, let us run single thread. So, no VKAPIProvider and
// VKAPIConsumer are needed
if (isDev) {
  const api = new VKAPI();
  
  // Run http server
  return http(api);
}

// In production mode, we do create as many forks as processor support
if (isMaster) {
  const cpuCount = os.cpus().length;
  const workers: Worker[] = [];

  for (let i = 0; i < cpuCount; i++) {
    workers.push(fork());
  }

  // In master we do create VKAPI instance, because consumers should
  // communicate with single its instance, which is in VKAPIProvider
  const provider = new VKAPIProvider({workers, instance: new VKAPI()});
  provider.init();
} 
// In consumer workers, we just create http server with VKAPIConsumer
else {
  // Create VKAPI instance consumer instance
  http(new VKAPIConsumer());
}
```

#### Defining connection between provider and consumer

There is a rare case, when your project contains 2 providers with 
different `VKAPI` instances. For example, you could create separate api 
instances for group and application which use different access tokens.

So then, it is allowed to pass same property `tunnelName` for both provider and 
consumer. Here is how it works:

```typescript
import {isMaster} from 'cluster'; 
import {VKAPI, VKAPIProvider, VKAPIConsumer} from 'vkontakte-api';

if (isMaster) {
  const groupApi = new VKAPI({accessToken: 'group access token'});
  const appApi = new VKAPI({accessToken: 'application access token'});

  // API provider for group API instance
  const groupApiProvider = new VKAPIProvider({tunnelName: 'group', instance: groupApi});
  groupApiProvider.init();

  // API provider for VK Mini Apps application API instance
  const appApiProvider = new VKAPIProvider({tunnelName: 'app', instance: appApi});
 appApiProvider.init(); 
} else {
  // Create API instance consumers
  const groupApi = new VKAPIConsumer({tunnelName: 'group'});
  const appApi = new VKAPIConsumer({tunnelName: 'app'});
}
``` 
