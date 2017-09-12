import checkSyntax from './checks/syntax'
import checkDisposable from './checks/disposable'

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

  if (!checkSyntax(str)) {
    return callback(null, makeResult({
      result: 'undeliverable',
      reason: 'invalid_email',
    }))
  }

  checkDisposable(str, (err, isDisposable) => {
    if (err) {
      return callback(err, makeResult({
        result: 'unknown',
        reason: err.message,
        success: false,
      }))
    }

    // TODO
    return callback(null, makeResult({
      result: 'deliverable',
      reason: 'accepted_email',
      disposable: isDisposable,
    }))
  })

  return undefined
}

export default pokemail
