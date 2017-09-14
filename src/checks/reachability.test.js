import test from 'tape'
import checkReachability from './reachability'

const it = (desc, callback) => test(`check-reachability ${desc}`, callback)

const badInput = [
  '',
  null,
  undefined,
  'user@127.0.0.1',
  'user@2a00:1450:400e:809::200e',
]
badInput.forEach((email) => {
  it(`responds with error for '${email}'`, (t) => {
    t.plan(1)
    checkReachability(email, (err) => {
      t.is(err instanceof TypeError, true)
      t.end()
    })
  })
})

it('accepts hostname with an MX record', (t) => {
  t.plan(2)
  checkReachability('test@mailinator.com', (err, actual) => {
    t.is(err, null)
    t.is(actual, true)
    t.end()
  })
})

it('rejects hostname without MX record', (t) => {
  t.plan(2)
  checkReachability('some-invalid-host-pokemail.com', (err, actual) => {
    t.is(err, null)
    t.is(actual, false)
    t.end()
  })
})

