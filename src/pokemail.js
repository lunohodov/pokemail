import checkSyntax from './checks/syntax'
import checkDisposable from './checks/disposable'
import checkReachability from './checks/reachability'
import packageData from '../package.json'

/**
 * Verifies the given email address against a set of predefined checks.
 *
 * @param {String} str - The email address to verify
 * @param {Function} callback - An error-first callback
 * @returns undefined
 */
function verify(str, callback) {
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
    callback(null, makeResult({
      result: 'undeliverable',
      reason: 'invalid_email',
    }))
    return
  }

  // eslint-disable-next-line consistent-return
  checkDisposable(str, (errDisposable, isDisposable) => {
    if (errDisposable) {
      reject(errDisposable)
      return
    }

    if (isDisposable) {
      callback(null, makeResult({
        result: 'deliverable',
        reason: 'accepted_email',
        disposable: true,
      }))
      return
    }

    checkReachability(str, (errHostname, reachable) => {
      if (errHostname) {
        reject(errHostname)
        return
      }

      callback(null, makeResult({
        result: reachable ? 'deliverable' : 'undeliverable',
        reason: reachable ? 'accepted_email' : 'rejected_email',
        disposable: isDisposable,
      }))
    })
  })
}

// Use what Node currently supports
// See https://medium.com/@kentcdodds/misunderstanding-es6-modules-upgrading-babel-tears-and-a-solution-ad2d5ab93ce0
module.exports = { verify, version: packageData.version }
