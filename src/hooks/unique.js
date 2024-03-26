// before / create,patch / any service

import Errors from '@feathersjs/errors'
function getKeysWithUniqueTrue(schemaObject) {
  const keysWithUniqueTrue = []

  // Iterate through each property in the schemaObject
  for (const key in schemaObject) {
    // Check if the property has a 'unique' property set to true
    if (schemaObject[key] && schemaObject[key].unique === true) {
      keysWithUniqueTrue.push(key) // If found, add the key to the array
    }
  }

  // If the array is empty, return falsy value, otherwise return the array
  return keysWithUniqueTrue.length > 0 ? keysWithUniqueTrue : undefined
}

export const unique = (schemaProperties) => async (context) => {
  if (!['create', 'patch'].includes(context.method)) return context // do nothing
  const uniqueKeys = getKeysWithUniqueTrue(schemaProperties)
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
