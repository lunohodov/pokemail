import tape from 'tape'
import checkDisposable from './disposable'

const it = (desc, callback) => tape(`check-disposable ${desc}`, callback)

it('check-disposable detects disposable email', (t) => {
  t.plan(1)

  const email = 'pokemail@mailinator.com'

  checkDisposable(email, (err, isDisposable) => {
    t.is(isDisposable, true)
    t.end()
  })
})

it('check-disposable detects non-disposable email', (t) => {
  t.plan(1)

  const email = 'pokemail@gmail.com'

  checkDisposable(email, (err, isDisposable) => {
    t.is(isDisposable, false)
    t.end()
  })
})
