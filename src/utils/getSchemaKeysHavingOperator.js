/**
 * Retrieves schema keys having a specified option set to true.
 * @param {object} schema - The schema object to traverse.
 * @param {string} option - The option to search for in the schema.
 * @returns {string[]} - An array of schema keys having the specified option.
 */

const getSchemaKeysHavingOperator = (schema, option) => {
  let propertiesWithOption = []

  /**
   * Traverses through the schema object recursively to find keys having the specified option.
   * @param {object} obj - The current object being traversed.
   * @param {string[]} [path=[]] - The current path of keys.
   */

  const traverse = (obj, path = []) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object') {
        if (value.hasOwnProperty(option) && value[option] === true) {
          propertiesWithOption.push(path.concat(key).join('.'))
        }
        traverse(value, path.concat(key))
      }
    })
  }

  traverse(schema)
  propertiesWithOption = propertiesWithOption.map((el) => el.replace(/properties./g, ''))
  return propertiesWithOption
}
export default getSchemaKeysHavingOperator
