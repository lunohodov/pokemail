import checkSyntax from './checks/syntax'
import checkDisposable from './checks/disposable'
import checkReachability from './checks/reachability'

// eslint-disable-next-line consistent-return
function pokemail(str, callback) {
  if (!callback) {
    throw new Error('Error-first callback is required')
  }

  const makeResult = props => (
    Object.assign({
      result: '',
      reason: '',
      disposable: false,
      email: str,
      success: true,
    }, props)
  )

  const reject = err => callback(err, makeResult({ result: 'unknown', reason: err.message, success: false }))

  if (!checkSyntax(str)) {
    return callback(null, makeResult({
      result: 'undeliverable',
      reason: 'invalid_email',
    }))
  }

  // eslint-disable-next-line consistent-return
  checkDisposable(str, (errDisposable, isDisposable) => {
    if (errDisposable) {
      return reject(errDisposable)
    }

    if (isDisposable) {
      return callback(null, makeResult({
        result: 'deliverable',
        reason: 'accepted_email',
        disposable: true,
      }))
    }

    checkReachability(str, (errHostname, reachable) => {
      if (errHostname) {
        return reject(errHostname)
      }

      return callback(null, makeResult({
        result: reachable ? 'deliverable' : 'undeliverable',
        reason: reachable ? 'accepted_email' : 'rejected_email',
        disposable: isDisposable,
      }))
    })
  })
}

export default pokemail
