import checkSyntax from './checks/syntax'

function pokemail(str) {
  const successResult = {
    result: 'deliverable',
    reason: '',
    disposable: false,
    email: str,
    success: true,
  }

  return new Promise((resolve) => {
    if (!checkSyntax(str)) {
      const result = Object.assign({}, successResult, {
        result: 'undeliverable',
        reason: 'invalid_email',
        success: false,
      })
      resolve(result)
    }
    resolve(successResult)
  })
}

export default pokemail
