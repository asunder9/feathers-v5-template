// before / create,patch / any service

const trimEndWhitespace = (str) => str.replace(/\s+$/, '')

function getKeysWithTrimTrue(schemaObject) {
  const keysWithUniqueTrue = []

  // Iterate through each property in the schemaObject
  for (const key in schemaObject) {
    // Check if the property has a 'trim' property set to true
    if (schemaObject[key] && schemaObject[key].trim === true) {
      keysWithUniqueTrue.push(key) // If found, add the key to the array
    }
  }

  // If the array is empty, return falsy value, otherwise return the array
  return keysWithUniqueTrue.length > 0 ? keysWithUniqueTrue : undefined
}

export const trim = (schemaProperties) => async (context) => {
  if (!['create', 'patch'].includes(context.method)) return context // do nothing
  const keysToTrim = getKeysWithTrimTrue(schemaProperties)
  if (!keysToTrim) return context // do nothing

  keysToTrim.forEach((key) => {
    if (context.data.hasOwnProperty(key)) context.data[key] = trimEndWhitespace(context.data[key])
  })

  return context
}
