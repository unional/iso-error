import { IsoError, ModuleError } from '.'

export class SubError extends IsoError { }

export class MyModuleError extends ModuleError {
  constructor(message?: string, options?: IsoError.Options) {
    super('my-module', message, options)
  }
}

export class MikuSickError extends MyModuleError {
  constructor(message = 'Miku is sick', options?: IsoError.Options) {
    super(message, options)
  }
}

export function createError() {
  return new Error('error from testErrors.ts')
}
