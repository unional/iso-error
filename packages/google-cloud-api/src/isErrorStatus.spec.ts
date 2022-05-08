import { omit } from 'type-plus'
import { isErrorStatus } from '.'

const validStatus = {
  code: 4,
  message: 'some message',
  details: []
}

test('missing code is not ErrorStatus', () => {
  expect(isErrorStatus(omit(validStatus, 'code'))).toBeFalsy()
})

test('missing message is not ErrorStatus', () => {
  expect(isErrorStatus(omit(validStatus, 'message'))).toBeFalsy()
})

test('missing details is not ErrorStatus', () => {
  expect(isErrorStatus(omit(validStatus, 'details'))).toBeFalsy()
})

test('minimum error status', () => {
  expect(isErrorStatus(validStatus)).toBeTruthy()
})
