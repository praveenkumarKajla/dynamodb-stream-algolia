const AWS = require('aws-sdk')
const converter = AWS.DynamoDB.Converter.unmarshall
const algoliasearch = require('./utils/algolia-wrapper')
const getTableNameFromARN = require('./utils/table-name-from-arn')
const { removeEventData } = require('./utils/index')

const validateString = (param, paramName) => {
  if (!param || !(typeof param === 'string')) throw new Error(`Please provide correct value for ${paramName}`)
}
const validateBoolean = (param, paramName) => {
  if (!(typeof param === 'boolean')) throw new Error(`Please provide correct value for ${paramName}`)
}
const validateFunctionOrUndefined = (param, paramName) => {
  if (!(typeof param === 'undefined' || typeof param === 'function')) throw new Error(`Please provide correct value for ${paramName}`)
}

exports.pushStream = async (
  {
    event,
    index_name = getTableNameFromARN(event.Records[0].eventSourceARN),
    appId,
    adminKey,
    logs = false
  } = {}) => {
  validateString(index_name, 'index_name')
  validateString(appId, 'appId')
  validateString(adminKey, 'adminKey')

  const algolia = algoliasearch(appId, adminKey)

  for (const record of event.Records) {
    const keys = converter(record.dynamodb.Keys)
    const id = Object.values(keys).reduce((acc, curr) => acc.concat(curr), '')

    switch (record.eventName) {
      case 'REMOVE': {
        if (logs) console.log(`Removing : ${id} from index_name : ${index_name}`)
        try {
          let response1 = await algolia.remove({index_name, id})
          if (logs) console.log(response1)
        } catch (e) {
          if (logs) console.log(e.message)
          throw new Error(e)
        }
        break
      }
      case 'INSERT': {
        if (logs) console.log(`${record.eventName} : ${id} for index_name : ${index_name}`)
        let body = converter(record.dynamodb.NewImage)
        const oldBody = record.dynamodb.OldImage ? converter(record.dynamodb.OldImage) : undefined
        body = removeEventData(body)
        if (logs) console.log(body)
        try {
          if (
            body &&
            (Object.keys(body).length !== 0 && body.constructor === Object)
          ) {
            let response2 = await algolia.add({ index_name, id, body })
            if (logs) console.log(`${record.eventName} body : ${response2} for index_name : ${index_name}`)
          }
        } catch (e) {
          throw new Error(e)
        }
        break
      }
      case 'MODIFY': {
        if (logs) console.log(`${record.eventName} : ${id} for index_name : ${index_name}`)
        let body = converter(record.dynamodb.NewImage)
        const oldBody = record.dynamodb.OldImage ? converter(record.dynamodb.OldImage) : undefined
        body = removeEventData(body)
        if (logs) console.log(body)
        try {
          if (
            body &&
            (Object.keys(body).length !== 0 && body.constructor === Object)
          ) {
            let response3 = await algolia.index({ index_name, id, body })
            if (logs) console.log(`${record.eventName} body : ${response3} for index_name : ${index_name}`)
          }
        } catch (e) {
          throw new Error(e)
        }
        break
      }
      default:
        throw new Error(record.eventName + ' wasn\'t recognized')
    }
  }
}
