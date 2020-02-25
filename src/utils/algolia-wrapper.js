const algoliasearch = require('algoliasearch')

module.exports = (appId, adminKey) => {

  const client = algoliasearch(appId, adminKey);
  return {
    add: async ({ index_name, id, body }) => {
      let index = client.initIndex(index_name);
      try {
        let content = await index.saveObject({ ...body, objectID: id })
        console.log('success');
        return content
      }
      catch (e) {
        throw new Error(e.message)
      }

    },
    index: async ({ index_name, id, body }) => {
      let index = client.initIndex(index_name);
      try {
        let content = await index.partialUpdateObject({ ...body, objectID: id }, {
          createIfNotExists: true
        })
        console.log('success');
        return content
      }
      catch (e) {
        throw new Error(e.message)
      }


    },
    remove: async ({ index_name, id }) => {
      let index = client.initIndex(index_name);
      try {
        let content = await index.deleteObject(id)
        console.log('success');
        return content
      }
      catch (e) {
        throw new Error(e.message)
      }
    },

    exists: async ({ index_name }) => {
      let index = client.initIndex(index_name);
      try {
        let content = await index.exists()
        console.log('success');
        return content
      }
      catch (e) {
        throw new Error(e.message)
      }
    },
    indicesDelete: async (index_name = '_all') => {
      let index = client.initIndex(index_name);
      try {
        let content = await index.delete()
        console.log('success');
        return content
      }
      catch (e) {
        throw new Error(e.message)
      }
    }
  }
}
