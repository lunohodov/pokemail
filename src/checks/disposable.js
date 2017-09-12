import http from 'https'

/**
 * Returns: {"disposable": true}
 */
const KICKBOX_ENDPOINT = 'https://open.kickbox.io/v1/disposable/'

function checkDisposable(str, cb) {
  const handleError = e => cb(e, false)

  const httpRequest = http.get(KICKBOX_ENDPOINT + str, (httpResponse) => {
    httpResponse.setEncoding('utf8')

    let responseBody = ''

    httpResponse.on('data', (chunk) => {
      responseBody += chunk
    })

    httpResponse.on('end', () => {
      try {
        const data = JSON.parse(responseBody)
        cb(null, data.disposable)
      } catch (e) {
        handleError(new TypeError(`Unexpected response: ${responseBody}`))
      }
    })
  })

  httpRequest.on('error', e => handleError(new TypeError(`Network request failed: ${e.message}`)))

  httpRequest.end()
}

export default checkDisposable
