const got = require('got')
const indexer = (obj, i) => obj[i]
const path = require('path')
const searches = require('./searches')

module.exports = (pluginContext) => {
  return {
    respondsTo: (query, env = {}) => {
      const prefixSearches = env.prefixSearches || {}
      const searchKeys = [...Object.keys(searches), ...Object.keys(prefixSearches)]

      return searchKeys.find((prefix) => {
        return query.indexOf(prefix + ' ') === 0
      })
    },
    search: (query, env = {}) => {
      const prefixSearches = env.prefixSearches || {}

      const queryBits = query.split(' ')
      const prefix = queryBits[0]
      const term = queryBits.slice(1).join(' ')

      const search = searches[prefix] || prefixSearches[prefix]
        if(prefix === "stash") {
          const url = `https://stash.dwolla.net/rest/api/latest/repos/?avatarSize\\=32\\&start\\=0\\&limit\\=20\\&name\\=${term}\\&projectname\\=`
           return Promise.resolve(got(url, {
            }).then(res => {
               let jsonBody = JSON.parse(res.body)
               [{
                   icon: jsonBody,
                   title: jsonBody,
                   subtitle: res.body,
                   value: res.body
               }]
           }))
        }
      return Promise.resolve(
        [
          {
            icon: search.icon || path.join('assets', prefix + '.png'),
            title: 'Search ' + search.name + ' for ' + term,
            value: search.url + encodeURIComponent(term)
          }
        ]
      )
    },
  }
}
