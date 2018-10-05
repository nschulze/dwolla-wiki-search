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
            const terms = term.split(' ')
            const modifier = terms[1] ? terms[1] : ''
            const url = `https://stash.dwolla.net/rest/api/latest/repos/?avatarSize=32&start=0&limit=20&name=${terms[0]}&projectname=`
           return Promise.resolve(got(url, {
            }).then(res => {
               const jsonBody = JSON.parse(res.body)
               return jsonBody.values.map(x => ({
                   icon: path.join('assets', prefix + '.png'),
                   title: getTitle(x.name, modifier),
                   subtitle: x.name + 'xx' + modifier + 'yy' + terms,
                   value: getUrl(x.links, modifier)
               }))
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

const getTitle = (name, modifier) => {
    if (modifier === 'branches' || modifier === 'pull-requests' || modifier === 'clone') {
        return name + ' ' + modifier;
    }
    return name;
}

const getUrl = (links, modifier) => {
    if (modifier === 'branches' || modifier === 'pull-requests') {
        const link = links.self[0].href;
        return link.substring(0, link.length-6) + modifier;
    } else if ( modifier === 'clone') {
        return links.clone.href;
    }
    return link;
}


