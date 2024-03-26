// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { setNow } from 'feathers-hooks-common'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  hardwareDataValidator,
  hardwarePatchValidator,
  hardwareQueryValidator,
  hardwareResolver,
  hardwareExternalResolver,
  hardwareDataResolver,
  hardwarePatchResolver,
  hardwareQueryResolver
} from './hardwares.schema.js'
import { HardwareService, getOptions } from './hardwares.class.js'

export const hardwarePath = 'hardwares'
export const hardwareMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './hardwares.class.js'
export * from './hardwares.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const hardware = (app) => {
  // Register our service on the Feathers application
  app.use(hardwarePath, new HardwareService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: hardwareMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(hardwarePath).hooks({
    around: {
      all: [
        // authenticate('jwt'), // authnetication is turned off for now. uncomment to enable it.
        schemaHooks.resolveExternal(hardwareExternalResolver),
        schemaHooks.resolveResult(hardwareResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(hardwareQueryValidator),
        schemaHooks.resolveQuery(hardwareQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(hardwareDataValidator),
        schemaHooks.resolveData(hardwareDataResolver),
        setNow('createdAt')
      ],
      patch: [
        // special_patch_one_hardware,
        schemaHooks.validateData(hardwarePatchValidator),
        schemaHooks.resolveData(hardwarePatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
