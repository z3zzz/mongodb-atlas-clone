require('dotenv').config()
const axios = require('axios')
const atlasInfo = require('./atlasInfo.json')

const from = atlasInfo.from
const to = atlasInfo.to 

startTransactions()

async function startTransactions() {
  const result = await cloneDatabase(from, to)

  console.log(`Final result: ${result}`)
}

async function getDocuments({ endpoint, database, collection }) {
  const url = `${endpoint}/action/find`
  const data = JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      filter: {}
  })
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.ATLAS_API_KEY_FROM
    }
  }

  try {
    const { data: { documents } } = await axios.post(url, data, options)
    
    return documents
  } catch (e) {
    console.log(`There was an error from getting dcouments: ${e.toJSON()}`)
  }

}

async function insertDocuments({ endpoint, database, collection, documents }) {
  const url = `${endpoint}/action/insertMany`
  const data = JSON.stringify({
      dataSource: "Cluster0",
      database,
      collection,
      documents
  })
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.ATLAS_API_KEY_TO
    }
  }

  try {
    await axios.post(url, data, options)

    return {result: "success"}
  } catch (e) {
    console.log('There was an error from inserting documents.')
    console.log(e.toJSON())
    
    return {result: "fail"}
  }
}

async function cloneDatabase(from, to) {
  const collections = from.collections

  let finalResult = 'success';
  for (const [index, collection] of collections.entries()) {
    const documents = await getDocuments({...from, collection})
    const { result } = await insertDocuments({...to, collection, documents})

    console.log(`${index+1}. ${collection} -> ${result}`)

    if (finalResult === "success") {
      finalResult = result
    }
  }

  return finalResult
}

