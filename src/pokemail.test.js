import test from 'blue-tape'
import pokemail from './pokemail'

test('verification returns a Promise', (t) => {
  const result = pokemail(null)

  t.ok(result instanceof Promise)
  t.end()
})

test('verification provides a result object', (t) => {
  t.plan(1)

  const expected = [
    'result',
    'reason',
    'disposable',
    'email',
    'success',
  ]

  pokemail('john.doe@example.com').then((result) => {
    const actual = Object.keys(result)

    t.deepEqual(actual, expected)
    t.end()
  })
})

test('verifies valid email', (t) => {
  t.plan(2)
  pokemail('test@valid.com').then((result) => {
    t.is(result.reason, '')
    t.is(result.success, true)
    t.end()
  })
})

test('rejects email with bad syntax', (t) => {
  t.plan(2)
  pokemail('test@invalid.co m').then((result) => {
    t.is(result.reason, 'invalid_email')
    t.is(result.success, false)
    t.end()
  })
})
