import test from 'blue-tape'
import pokemail from './pokemail'

const it = (desc, callback) => test(`pokemail ${desc}`, callback)

it('marks a valid email as deliverable', (t) => {
  t.plan(3)
  pokemail('lunohodov@gmail.com', (err, status) => {
    t.is(status.result, 'deliverable')
    t.is(status.reason, 'accepted_email')
    t.is(status.success, true)
    t.end()
  })
})

it('marks ill formatted email as undeliverable', (t) => {
  t.plan(3)
  pokemail('test@invalid.co m', (err, status) => {
    t.is(status.result, 'undeliverable')
    t.is(status.reason, 'invalid_email')
    t.is(status.success, true)
    t.end()
  })
})

it('marks disposable email as deliverable', (t) => {
  t.plan(4)
  pokemail('pokemail@mailinator.com', (err, status) => {
    t.is(status.result, 'deliverable')
    t.is(status.reason, 'accepted_email')
    t.is(status.disposable, true)
    t.is(status.success, true)
    t.end()
  })
})
