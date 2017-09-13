import test from 'tape'
import checkHostname from './hostname'

const it = (desc, callback) => test(`check-hostname ${desc}`, callback)

const invalidHostnames = new Map([
  ['empty', ''],
  ['null', null],
  ['undefined', undefined],
  ['ip4 address', '127.0.0.1'],
  ['ip6 address', '2a00:1450:400e:809::200e'],
])

invalidHostnames.forEach((hostname, message) => {
  it(`yields error for ${message}`, (t) => {
    t.plan(1)
    checkHostname(hostname, (err) => {
      t.is(err instanceof Error, true)
      t.end()
    })
  })
})

it('accepts hostname with an MX record', (t) => {
  t.plan(2)
  checkHostname('gmail.com', (err, actual) => {
    t.is(!err, true, 'no error')
    t.is(actual, true)
    t.end()
  })
})

it('rejects hostname without MX record', (t) => {
  t.plan(2)
  checkHostname('some-invalid-host-pokemail.com', (err, actual) => {
    t.is(err, null)
    t.is(actual, false)
    t.end()
  })
})

