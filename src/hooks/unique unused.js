// before / create,patch / any service

import Errors from '@feathersjs/errors'
import getSchemaKeysHavingOperator from '../utils/getSchemaKeysHavingOperator.js'

export const unique = (schemaProperties) => async (context) => {
  if (!['create', 'patch'].includes(context.method)) return context // do nothing
  const uniqueKeys = getSchemaKeysHavingOperator(schemaProperties, 'unique')
  if (!uniqueKeys) return context // do nothing
  console.log('uniqueKeys>>>>>>>>>>>>>>', uniqueKeys)
  if (context.method === 'create') {
    for (let i = 0; i < uniqueKeys.length; i++) {
      const uniKey = uniqueKeys[i]
      if (context.data.hasOwnProperty(uniKey)) {
        let queryObject = {
          $limit: 0,

          [uniKey]: context.data[uniKey]
        }
        const total = (await context.service.find({ query: queryObject })).total
        if (total > 0) throw new Errors.Conflict(`Duplicate Value. [${uniqueKeys}] value must be unique`)
      }
    }
  }

  if (context.method === 'patch') {
    for (let i = 0; i < uniqueKeys.length; i++) {
      const uniKey = uniqueKeys[i]
      if (context.data.hasOwnProperty(uniKey)) {
        let queryObject = {
          $limit: 0,
          _id: {
            $ne: context.id // find other than this document
          },
          [uniKey]: context.data[uniKey]
        }
        const total = (await context.service.find({ query: queryObject })).total
        if (total > 0) throw new Errors.Conflict(`Duplicate Value. [${uniqueKeys}] value must be unique`)
      }
    }
  }

  return context
}
