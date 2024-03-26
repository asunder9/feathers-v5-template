import { keywordObjectId } from '@feathersjs/mongodb'

// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import { Ajv, addFormats } from '@feathersjs/schema'

const formats = [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
]

export const dataValidator = addFormats(new Ajv({ useDefaults: 'empty', removeAdditional: 'all' }), formats)
// for `useDefaults` see https://ajv.js.org/options.html#usedefaults
// for `removeAdditional` see https://ajv.js.org/options.html#removeadditional

export const queryValidator = addFormats(
  new Ajv({
    coerceTypes: () => true
  }),
  formats
)

// allow custom keywords to the schema

// i.e. `unique` and `trim` are not part of json-schema options. Here we are registering them as custom keys.
const noopKeywords = [
  {
    keyword: 'unique',
    schemaType: 'boolean',
    validate: () => true // This function always returns true, effectively skipping validation
  },
  {
    // allow trim custom keyword to the schema
    keyword: 'trim',
    schemaType: 'boolean',
    validate: () => true // This function always returns true, effectively skipping validation
  }
]

noopKeywords.forEach((el) => {
  dataValidator.addKeyword(el)
  queryValidator.addKeyword(el)
})

dataValidator.addKeyword(keywordObjectId)
queryValidator.addKeyword(keywordObjectId)
