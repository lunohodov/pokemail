import test from 'tape'
import pokemail from './pokemail'

test('verification provides a result object', (assert) => {
  const expected = [
    "result",
    "reason",
    "disposable",
    "email",
    "user",
    "domain",
    "success"
  ]

  const result = pokemail('john.doe@example.com')
  const actual = Object.keys(result);

  assert.deepEqual(expected, actual)

  assert.end()
})
