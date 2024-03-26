// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax, virtual } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const doorSchema = {
  $id: 'Door',
  type: 'object',
  additionalProperties: false,
  required: ['_id'],
  properties: {
    _id: ObjectIdSchema(),
    entity_type: { type: 'string', default: 'doors' },
    label: { type: 'string', trim: true },
    door_criptor: { type: 'string', unique: true },
    icon: { type: 'string', default: 'ph-bold ph-door' },
    description: { type: 'object', trim: true },
    potato: {
      type: 'object',
      properties: {
        x: { type: 'string', trim: true, unique: true }
      }
    },
    hardware_id: { type: 'string' } //ref
  }
}

export const doorValidator = getValidator(doorSchema, dataValidator)
//resolver is general. It will run when the api call is done from within the server (internally) and from outside like a UI or postman (externally)
export const doorResolver = resolve({
  //populate: this will create another field called 'hardware' in the api call result and populate it with the hardware object.
  hardware: virtual(async (entity, context) => {
    try {
      if (entity?.hardware_id) return await context.app.service('hardwares').get(entity?.hardware_id)
    } catch (error) {
      throw error
    }
    return undefined
  })

  /**
   * example for one-to-many populate
   
  hardwares: virtual(async (entity, context) => {
    try {
      if (entity?.hardwares_ids) {
        const promises = entity.hardwares_ids.map((el) => context.app.service('hardwares').get(el))
        return await Promise.all(promises)
      }
    } catch (error) {
      throw error
    }
    return undefined
  })

   
   */
})

//External Resolver runs only when the api call is done from outside like a UI or postman (externally)
export const doorExternalResolver = resolve({})

// Schema for creating new data
export const doorDataSchema = {
  $id: 'DoorData',
  type: 'object',
  additionalProperties: false, // false: will cause validator to throw an error if the query params has a field that does not appear in doorSchema.properties. true: will not throw an error.
  required: ['door_criptor'],
  properties: {
    ...doorSchema.properties
  }
}
export const doorDataValidator = getValidator(doorDataSchema, dataValidator)
export const doorDataResolver = resolve({})

// Schema for updating existing data
export const doorPatchSchema = {
  $id: 'DoorPatch',
  type: 'object',
  additionalProperties: true, // false: will cause validator to throw an error if the query params has a field that does not appear in doorSchema.properties. true: will not throw an error.
  required: [],
  properties: {
    ...doorSchema.properties
  }
}
export const doorPatchValidator = getValidator(doorPatchSchema, dataValidator)
export const doorPatchResolver = resolve({})

// Schema for allowed query properties
export const doorQuerySchema = {
  $id: 'DoorQuery',
  type: 'object',
  additionalProperties: true, // false: will cause validator to throw an error if the query params has a field that does not appear in doorSchema.properties. true: will not throw an error.
  properties: {
    ...querySyntax(doorSchema.properties)
  }
}
export const doorQueryValidator = getValidator(doorQuerySchema, queryValidator)
export const doorQueryResolver = resolve({})
