const algoliasearch = require('algoliasearch')

module.exports = (appId, adminKey) => {

  const client = algoliasearch(appId, adminKey);
  return {
    add: ({ index_name, id, body }) => new Promise((resolve, reject) => {
      let index = client.initIndex(index_name);
      index.addObject({ ...body, objectID: id }, (err, content) => {
        if (err) reject(err)
        console.log('success');
        resolve(content)
      });
    }),
    index: ({ index_name, id, body }) => new Promise((resolve, reject) => {
      let index = client.initIndex(index_name);
      index.partialUpdateObject({ ...body, objectID: id }, true, (err, content) => {
        if (err) reject(err)
        console.log('success');
        resolve(content)
      });
    }),
    remove: ({ index_name, id }) => new Promise((resolve, reject) => {
      let index = client.initIndex(index_name);
      index.deleteObject(id, (error, response) => {
        if (error) reject(error)
        console.log('success');
        resolve(response)
      })
    }),

    exists: ({ index_name }) => new Promise((resolve, reject) => {
      let index = client.initIndex(index_name);
      index.exists({ index }, (error, response) => {
        if (error) reject(error)
        resolve(response)
      })
    }),
    indicesDelete: (index_name = '_all') => new Promise((resolve, reject) => {
      client.deleteIndex(index_name, (err, content) => {
        if (err) reject(err)
        console.log('success');
        resolve(content)

      });
    })
  }
}
