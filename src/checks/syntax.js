/* eslint-disable max-len */
/* eslint-disable no-control-regex */
/* eslint-disable no-useless-escape */
const userPattern = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i
const quotedUserPattern = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i
const domainPattern = /^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i
const subDomainPattern = /^[a-z\u00a1-\uffff0-9-]+$/i
const fullWidthCharsPattern = /[\uff01-\uff5e]/
const spacesPattern = /[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/
/* eslint-enable max-len */
/* eslint-enable no-control-regex */
/* eslint-enable no-useless-escape */

function byteLength(str) {
  return encodeURI(str).split(/%..|./).length
}

function isFullyQualifiedDomain(str) {
  const parts = str.split('.')
  const tld = parts.pop()

  if (!parts.length || !domainPattern.test(tld)) {
    return false
  }

  if (spacesPattern.test(tld)) {
    return false
  }

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i]

    if (!subDomainPattern.test(part)) {
      return false
    }

    if (fullWidthCharsPattern.test(part)) {
      return false
    }

    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false
    }
  }

  return true
}

function checkSyntax(str) {
  if (str === undefined || str === null) {
    return false
  }

  const parts = str.split('@')
  const domain = parts.pop()
  let user = parts.join('@')

  const lowerDomain = domain.toLowerCase()
  if (lowerDomain === 'gmail.com' || lowerDomain === 'googlemail.com') {
    // Google ignores dots and is case insensitive
    user = user.replace(/\./g, '').toLowerCase()
  }

  if (byteLength(user) > 64 || byteLength(domain) > 256) {
    return false
  }

  if (!isFullyQualifiedDomain(domain)) {
    return false
  }

  const isQuoted = user[0] === '"'
  if (isQuoted) {
    user = user.slice(1, user.length - 1)

    return quotedUserPattern.test(user)
  }

  const userParts = user.split('.')
  for (let i = 0; i < userParts.length; i += 1) {
    if (!userPattern.test(userParts[i])) {
      return false
    }
  }

  return true
}

export default checkSyntax
