# feathers-app

## Asunder Description

This is a nodejs backend template for feathersJS v5 using: 
- NodeJS - recommended version node `18.18.x`
- Database - MongoDB
- Schema - [json-schema](https://json-schema.org/)

## Change Log:
### v0.3.0 - 27-03-24
- [x] removed `unique.js` hook, now utilizes mongodb's `createIndex` at the `<service-name>.class.`.
- [x] added `getSchemaKeysHavingOperator.js` util.
- [x] modified (`trim.js` renamed to `trimmer.js`) hook to work with deeply nested schema options keywords. 

### v0.2.0 - 26-03-24
- [x] adding two custom hooks. `unique` and `trim`. See `validator.js` for registering custom keywords and the hook files in `/hooks/`.
- [x] Added one-to-one relationship between `doors` and `hardwares` in `doors.schema.js`. `doors` refer to `hardwares` database. 

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/my-app
    npm install
    ```

3. Start your app

    ```
    npm run dev
    ```

## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
