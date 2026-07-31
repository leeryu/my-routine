'use strict';
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const handlers = {}; const deleted = []; const added = []; const store = new Map();
const cache = { async addAll(items) { added.push(...items); items.forEach(x => store.set(x, { url: x, ok: true, clone(){return this;} })); }, async put(req,res){ store.set(typeof req === 'string' ? req : req.url,res); } };
const context = {
  self: { addEventListener(type, fn){ handlers[type]=fn; }, async skipWaiting(){ context.skipped=true; }, clients:{ async claim(){context.claimed=true;} } },
  caches: { async open(){return cache;}, async keys(){return ['routine-v3','routine-v4','routine-v5'];}, async delete(k){deleted.push(k);return true;}, async match(req){const key=typeof req==='string'?req:req.url; return store.get(key);}},
  location:{origin:'https://app.test'}, Response, URL,
  fetch: async () => { throw new Error('offline'); }, console,
};
vm.runInNewContext(fs.readFileSync('sw.js','utf8'), context, {filename:'sw.js'});
async function dispatch(type, event={}) { let waited; event.waitUntil=p=>{waited=Promise.resolve(p)}; handlers[type](event); await waited; return event; }
(async()=>{
  await dispatch('install'); assert.ok(added.includes('./js/rehab.js')); assert.ok(context.skipped); console.log('ok - fresh install precaches rehab.js and skipWaiting completes');
  await dispatch('activate'); assert.deepEqual(deleted.sort(),['routine-v3','routine-v4']); assert.ok(context.claimed); console.log('ok - update removes old caches and claims clients');
  const rehabResponse={url:'cached-rehab'}; store.set('https://app.test/js/rehab.js',rehabResponse);
  let responsePromise; handlers.fetch({request:{method:'GET',url:'https://app.test/js/rehab.js',mode:'same-origin'},respondWith:p=>{responsePromise=p},waitUntil:()=>{}}); assert.equal(await responsePromise,rehabResponse); console.log('ok - offline rehab.js uses matching cache');
  handlers.fetch({request:{method:'GET',url:'https://app.test/js/missing.js',mode:'same-origin'},respondWith:p=>{responsePromise=p},waitUntil:()=>{}}); const missing=await responsePromise; assert.equal(missing.type,'error'); console.log('ok - missing offline asset does not receive HTML fallback');
  const shell={url:'shell'}; store.set('./index.html',shell); handlers.fetch({request:{method:'GET',url:'https://app.test/rehab',mode:'navigate'},respondWith:p=>{responsePromise=p},waitUntil:()=>{}}); assert.equal(await responsePromise,shell); console.log('ok - offline navigation falls back to app shell');
})().catch(e=>{console.error(e);process.exitCode=1});