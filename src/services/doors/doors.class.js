import { MongoDBService } from '@feathersjs/mongodb'
import { doorSchema } from './doors.schema.js'
import getSchemaKeysHavingOperator from '../../utils/getSchemaKeysHavingOperator.js'

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class DoorService extends MongoDBService {}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => {
      const collection = db.collection('doors')
      // Create a unique index on the door_id field
      const keys = getSchemaKeysHavingOperator(doorSchema.properties, 'unique') // this may include single or deeply nested properties like ["email", "details.contacts.phoneNo"]

      if (keys)
        keys.forEach((key, i) => {
          collection.createIndex({ [key]: i + 1 }, { unique: true })
        })

      return collection
    })
  }
}
