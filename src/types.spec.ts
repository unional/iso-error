import { ErrorStatus, RetryInfo } from '.';
import { DebugInfo, ErrorDetail } from './types';
/* eslint-disable @typescript-eslint/camelcase */
test('can specify specific detail types', () => {
  const json: ErrorStatus<RetryInfo | DebugInfo | ErrorDetail> = {
    code: 200, message: 'msg', details: [{
      '@type': 'type.googleapis.com/google.rpc.RetryInfo',
      retry_delay: { seconds: 0, nanos: 0 }
    }, {
      '@type': 'type.googleapis.com/google.rpc.DebugInfo',
      stack_entries: [],
      detail: ''
    }, {
      '@type': 'custom',
      description: 'some description'
    }]
  }

  expect(json).toBeDefined()
})
/* eslint-enable @typescript-eslint/camelcase */
