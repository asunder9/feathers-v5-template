// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const hardwareSchema = {
  $id: 'Hardware',
  type: 'object',
  additionalProperties: false,
  required: ['_id'],
  properties: {
    _id: ObjectIdSchema(),
    entity_type: { type: 'string', default: 'hardwares', readOnly: true },
    label: { type: 'string', trim: true },
    icon: { type: 'string', default: 'ph-bold ph-device-mobile-speaker' },
    description: { type: 'string', trim: true },
    device_name: { type: 'string', trim: true },
    device_criptor: { type: 'string', unique: true },
    version: { type: 'string', trim: true },
    is_online: { type: 'boolean', default: false }
  }
}

export const hardwareValidator = getValidator(hardwareSchema, dataValidator)
export const hardwareResolver = resolve({})

export const hardwareExternalResolver = resolve({})

// Schema for creating new data
export const hardwareDataSchema = {
  $id: 'HardwareData',
  type: 'object',
  additionalProperties: false, // false: will cause validator to throw an error if the query params has a field that does not appear in doorSchema.properties. true: will not throw an error.
  required: ['label'],
  properties: {
    ...hardwareSchema.properties
  }
}
export const hardwareDataValidator = getValidator(hardwareDataSchema, dataValidator)
export const hardwareDataResolver = resolve({})

// Schema for updating existing data
export const hardwarePatchSchema = {
  $id: 'HardwarePatch',
  type: 'object',
  additionalProperties: true, // false: will cause validator to throw an error if the query params has a field that does not appear in doorSchema.properties. true: will not throw an error.
  required: [],
  properties: {
    ...hardwareSchema.properties
  }
}
export const hardwarePatchValidator = getValidator(hardwarePatchSchema, dataValidator)
export const hardwarePatchResolver = resolve({})

// Schema for allowed query properties
export const hardwareQuerySchema = {
  $id: 'HardwareQuery',
  type: 'object',
  additionalProperties: true, // false: will cause validator to throw an error if the query params has a field that does not appear in doorSchema.properties. true: will not throw an error.
  properties: {
    ...querySyntax(hardwareSchema.properties)
  }
}
export const hardwareQueryValidator = getValidator(hardwareQuerySchema, queryValidator)
export const hardwareQueryResolver = resolve({})
