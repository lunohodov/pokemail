import test from 'blue-tape'
import pokemail from './pokemail'

test('verification provides valid result object', (t) => {
  t.plan(1)

  const expected = [
    'result',
    'reason',
    'disposable',
    'email',
    'success',
  ]

  pokemail('john.doe@example.com', (err, result) => {
    const actual = Object.keys(result)

    t.deepEqual(actual, expected)
    t.end()
  })
})

test('verifies valid email', (t) => {
  t.plan(2)
  pokemail('test@valid.com', (err, result) => {
    t.is(result.reason, '')
    t.is(result.success, true)
    t.end()
  })
})

test('rejects email with bad syntax', (t) => {
  t.plan(2)
  pokemail('test@invalid.co m', (err, result) => {
    t.is(result.reason, 'invalid_email')
    t.is(result.success, false)
    t.end()
  })
})
