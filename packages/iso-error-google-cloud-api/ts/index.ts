import { rpc, GoogleCloudApiError } from 'google-cloud-api'
import type { IsoErrorPlugin } from 'iso-error'

/**
 * re-exporting `google-cloud-api` so that consumer will always use the matching version.
 * If not, the `instanceof` check might fail.
 */
export * from 'google-cloud-api'

export const googleCloudApiPlugin: IsoErrorPlugin = {
	toSerializable(err) {
		if (!isGoogleCloudApiError(err)) return undefined

		const status = err.toRpcStatus()
		status.details = status.details.filter(
			d => d['@type'] !== 'type.googleapis.com/google.rpc.DebugInfo'
		)
		return status
	},
	fromSerializable(obj) {
		return rpc.isStatus(obj) ? rpc.statusToError(obj) : undefined
	}
}

function isGoogleCloudApiError(err: any): err is GoogleCloudApiError {
	return err instanceof GoogleCloudApiError
}

export default googleCloudApiPlugin
