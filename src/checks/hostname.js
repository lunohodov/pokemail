import { isIP } from 'net'
import dns from 'dns'

/**
 * Checks whether a hostname is reachable
 *
 * @param hostname The hostname to check
 * @param callback Error-first callback
 */
function checkHostname(hostname, callback) {
  if (!hostname || hostname.length === 0 || isIP(hostname)) {
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

    return callback(null, addresses.length > 0)
  })
}

export default checkHostname
