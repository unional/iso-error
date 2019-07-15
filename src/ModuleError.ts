import { IsoError } from './IsoError';

/**
 * An IsoError with a module property.
 */
export class ModuleError extends IsoError {
  /**
   * @param module The module that defines this error.
   */
  constructor(public module: string, description: string, ...errors: Error[]) {
    super(description, ...errors)
  }
}
