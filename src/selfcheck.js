const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const code = html.match(/function appFor\(item\) \{[\s\S]*?\n    \}/)[0];
const context = { installed: [
  { name: 'YouTube Kids', id: 'kids' },
  { name: 'YouTube', id: 'youtube' },
  { name: 'Stremio', id: 'stremio' }
] };
vm.createContext(context);
vm.runInContext(code, context);
assert.equal(context.appFor({ matches: ['youtube'] }).id, 'youtube');
assert.equal(context.appFor({ matches: ['stremio'] }).id, 'stremio');
assert.equal(context.appFor({ matches: ['netflix'] }), undefined);
console.log('App matching checks passed');
