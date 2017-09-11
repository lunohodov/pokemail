import checkSyntax from './checks/syntax'

function pokemail(str, cb) {
  let result = {
    result: 'deliverable',
    reason: '',
    disposable: false,
    email: str,
    success: true,
  }

  if (!checkSyntax(str)) {
    result = Object.assign(result, {
      result: 'undeliverable',
      reason: 'invalid_email',
      success: false,
    })
  }
  cb(null, result)
}

export default pokemail
