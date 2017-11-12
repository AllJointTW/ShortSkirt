const { json, send } = require('micro')
const { router, get, post } = require('microrouter')
const redirect = require('micro-redirect')
const memory = {}
const makeRandomId = (length) => Math.random().toString(36).substring(2, length + 2)
const saveIn = (cache, id, skirt) => {
  cache[id] = skirt
  return id
}
const getFrom = (cache, id) => cache[id]
const shorten = async (req, res) => {
  const { skirt } = await json(req)

  return saveIn(memory, makeRandomId(7), skirt)
}
const pullUp = (req, res) => {
  const { skirt } = req.params

  redirect(res, 302, getFrom(memory, skirt))
}
const notFound = (req, res) => send(res, 404, 'Not Found')

module.exports = router(
  post('/shorten', shorten),
  get('/pull-up/:skirt', pullUp),
  get('/*', notFound)
)
