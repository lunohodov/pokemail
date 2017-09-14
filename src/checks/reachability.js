import { isIP } from 'net'
import dns from 'dns'

const extractHostname = (str) => {
  if (typeof str !== 'string' || str.length < 2) {
    return ''
  }

  const chunks = str.split('@')

  return chunks.length > 1 ? chunks[1] : ''
}

function checkReachability(email, callback) {
  const hostname = extractHostname(email)

  if (hostname.length === 0 || isIP(hostname)) {
    callback(new TypeError('A valid hostname argument is required'))
    return
  }

  dns.resolveMx(hostname, (err, addresses) => {
    if (err) {
      if (err.code === 'ENOTFOUND') {
        return callback(null, false)
      }
      return callback(err)
    }

    return callback(null, addresses.length > 1)
  })
}

export default checkReachability
