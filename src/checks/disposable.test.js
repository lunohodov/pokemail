import test from 'tape'
import checkDisposable from './disposable'

test('check-disposable detects disposable email', (t) => {
  t.plan(1)

  const email = 'pokemail@mailinator.com'

  checkDisposable(email, (err, isDisposable) => {
    t.is(isDisposable, true)
    t.end()
  })
})

test('check-disposable detects non-disposable email', (t) => {
  t.plan(1)

  const email = 'pokemail@gmail.com'

  checkDisposable(email, (err, isDisposable) => {
    t.is(isDisposable, false)
    t.end()
  })
})
