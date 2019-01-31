# server testing

- yarn add supertest --dev

## components of an api

function name(args) => return something;

- routes/endpoints: url+method(data) => return response;
- business logic (validation/data conversion/operations).
- data access: talk to the persistent data store.

set the test environment to run on 'node' instead of a browser

- window.setTimout > global.setTimeout

```
"jest": {
  "testenvironment": "jsdom" // Default setting
  "testenvironment": "node" // change to this
}
```
