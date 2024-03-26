// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { setNow } from 'feathers-hooks-common'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  doorDataValidator,
  doorPatchValidator,
  doorQueryValidator,
  doorResolver,
  doorExternalResolver,
  doorDataResolver,
  doorPatchResolver,
  doorQueryResolver,
  doorSchema
} from './doors.schema.js'
import { DoorService, getOptions } from './doors.class.js'
import { trimmer } from '../../hooks/trimmer.js'

export const doorPath = 'doors'
export const doorMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './doors.class.js'
export * from './doors.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const door = (app) => {
  // Register our service on the Feathers application
  app.use(doorPath, new DoorService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: doorMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(doorPath).hooks({
    around: {
      all: [
        // authenticate('jwt'), // authnetication is turned off for now. uncomment to enable it.
        schemaHooks.resolveExternal(doorExternalResolver),
        schemaHooks.resolveResult(doorResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(doorQueryValidator),
        schemaHooks.resolveQuery(doorQueryResolver),
        trimmer(doorSchema.properties)
        // unique(doorSchema.properties)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(doorDataValidator),
        schemaHooks.resolveData(doorDataResolver),
        setNow('createdAt')
      ],
      patch: [
        // special_patch_one_door,
        schemaHooks.validateData(doorPatchValidator),
        schemaHooks.resolveData(doorPatchResolver)
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
