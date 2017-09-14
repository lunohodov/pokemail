import { isIP } from 'net'
import { URL } from 'url'
import dns from 'dns'

const extractHostname = (email) => {
  if (email && email.length > 0) {
    try {
      return (new URL(`mailto://${email}`)).hostname
    } catch (e) {
      // Pass
    }
  }

  return null
}

function checkReachability(email, callback) {
  const hostname = extractHostname(email)

  if (!hostname || isIP(hostname)) {
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
