import { fromErrorStatus, GoogleCloudApiError, isErrorStatus } from 'google-cloud-api'
import { IsoErrorPlugin } from 'iso-error'

const plugin: IsoErrorPlugin = {
  toSerializable(err) {
    if (!isGoogleCloudApiError(err)) return undefined

    const status = err.toErrorStatus()
    status.details = status.details.filter(d => d['@type'] != 'type.googleapis.com/google.rpc.DebugInfo')
    return status
  },
  fromSerializable(obj) {
    return isErrorStatus(obj) ? fromErrorStatus(obj) : undefined
  },
}

function isGoogleCloudApiError(err: any): err is GoogleCloudApiError {
  return err instanceof GoogleCloudApiError
}

export default plugin
