const searches = {
  amazon: { name: 'Amazon', url: 'https://www.amazon.com/s?url=search-alias=aps&field-keywords='},
  wiki: { name: 'Wiki', url: 'https://sites.google.com/a/dwolla.com/wiki/system/app/pages/search?scope=search-site&q='},
  jira: { name:'Jira', url: 'https://jira.dwolla.net/secure/QuickSearch.jspa?searchString='},
  stash: {name: 'Stash', url:'https://stash.dwolla.net/projects/FE/repos/'},
  drive: { name: 'Drive', url: 'https://drive.google.com/drive/search?q='},
  giphy: { name: 'Giphy', url: 'https://giphy.com/search/'},
  gh: { name: 'GitHub', url: 'https://github.com/search?utf8=%E2%9C%93&q='},
  google: { name: 'Google', url: 'https://www.google.com/search?q='},
  npm: { name: 'NPM', url: 'https://www.npmjs.com/search?q='},
  stack: { name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q='},
  splunk: {name: 'Splunk', url: 'https://splunk.dwolla.net/en-US/app/search/search?q=search%20'}
}

module.exports = searches
