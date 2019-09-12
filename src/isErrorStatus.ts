import { ErrorStatus } from './types';

export function isErrorStatus(input: any): input is ErrorStatus {
  return typeof input === 'object' &&
    typeof input.code === 'number' &&
    typeof input.message === 'string' &&
    Array.isArray(input.details)
}
