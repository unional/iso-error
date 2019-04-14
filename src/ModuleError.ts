import { IsoError } from './IsoError';

export class ModuleError extends IsoError {
  constructor(public module: string, code: string | number, description: string, ...errors: Error[]) {
    super(code, description, ...errors)
  }
}
