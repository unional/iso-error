import { rpc, GoogleCloudApiError } from 'google-cloud-api'
import { IsoErrorPlugin } from 'iso-error'

const plugin: IsoErrorPlugin = {
  toSerializable(err) {
    if (!isGoogleCloudApiError(err)) return undefined

    const status = err.toRpcStatus()
    status.details = status.details.filter(d => d['@type'] !== 'type.googleapis.com/google.rpc.DebugInfo')
    return status
  },
  fromSerializable(obj) {
    return rpc.isStatus(obj) ? rpc.statusToError(obj) : undefined
  },
}

function isGoogleCloudApiError(err: any): err is GoogleCloudApiError {
  return err instanceof GoogleCloudApiError
}

export default plugin
