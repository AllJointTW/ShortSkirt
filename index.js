const { send, json } = require('micro')
const { router, get, post } = require('microrouter')
const redirect = require('micro-redirect')
const { curry } = require('ramda')
const urls = {}
const short = async (req, res) => {
  const { url } = await json(req)
  let shortURL = urls[url]

  // Check Exist
  if (shortURL) { // Yes
    send(res, 200, shortURL)
  }
  // No, Make A New One
  const skirt = Math.random().toString(36).substring(7)

  shortURL = skirt
  urls[skirt] = url
  send(res, 200, shortURL)
}
const pullUp = (req, res) => {
  const { skirt } = req.params
  const statusCode = 302
  const location = urls[skirt]

  redirect(res, statusCode, location)
}
const notfound = (req, res) => send(res, 404, 'Not Found')

module.exports = router(
  post('/', short),
  get('/:skirt', pullUp),
  get('/*', notfound)
)
