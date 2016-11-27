const test = require('tape')
const jsdom = require('jsdom').jsdom
const Prelodr = require('./dist/prelodr.js')

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

test('Test suite', t => {
  t.plan(7)

  var i = 1
  const pre = Prelodr()

  pre.on('shown', () => t.ok(1, `when prelodr is shown [${i}]`))
  pre.on('hidden', () => {
    t.ok(1, `when prelodr is hidden [${i}]`)
    i++
  })

  pre
    .show('Loading...')
    .hide()

    .show('Processing...')
    .hide()

  pre
    .show('Finishing...')
    .hide(done => {
      setTimeout(() => {
        t.ok(1, 'when callback is passed to hide() method.')
        done()
      }, 2000)
    })
})