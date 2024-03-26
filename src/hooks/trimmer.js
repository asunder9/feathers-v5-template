// before / create,patch / any service
import getSchemaKeysHavingOperator from '../utils/getSchemaKeysHavingOperator.js'
import _ from 'lodash'

export const trimmer = (schemaProperties) => async (context) => {
  if (!['create', 'patch'].includes(context.method)) return context // do nothing
  const keysToTrim = getSchemaKeysHavingOperator(schemaProperties, 'trim')
  if (!keysToTrim) return context // do nothing

  keysToTrim.forEach((key) => {
    if (_.has(context.data, key)) {
      _.set(context.data, key, _.trim(_.get(context.data, key)))
    }
  })

  return context
}
