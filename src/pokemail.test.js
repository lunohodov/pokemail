import test from 'tape'
import pokemail from './pokemail'

const testData = [
  {
    name: 'ill formatted email is undeliverable',
    expected: {
      result: 'undeliverable',
      reason: 'invalid_email',
      disposable: false,
      email: 'test@invalid.co m',
      success: true,
    },
  },
  {
    name: 'disposable email is deliverable',
    expected: {
      result: 'deliverable',
      reason: 'accepted_email',
      disposable: true,
      email: 'pokemail@mailinator.com',
      success: true,
    },
  },
  {
    name: 'user@ip4 is undeliverable',
    expected: {
      result: 'undeliverable',
      reason: 'invalid_email',
      disposable: false,
      email: 'pokemail@127.0.0.1',
      success: true,
    },
  },
  {
    name: 'user@ip6 is undeliverable',
    expected: {
      result: 'undeliverable',
      reason: 'invalid_email',
      disposable: false,
      email: 'pokemail@2a00:1450:400e:809::200e',
      success: true,
    },
  },
  {
    name: 'email domain with MX record is deliverable',
    expected: {
      result: 'deliverable',
      reason: 'accepted_email',
      disposable: false,
      email: 'lunohodov@gmail.com',
      success: true,
    },
  },
]

testData.forEach((data) => {
  /* eslint-disable prefer-destructuring */
  const name = data.name
  const expected = data.expected
  const email = expected.email
  /* eslint-enable prefer-destructuring */

  test(name, (t) => {
    t.plan(1)
    pokemail(email, (err, actual) => {
      t.deepEqual(actual, expected)
      t.end()
    })
  })
})

