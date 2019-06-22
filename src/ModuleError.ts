import { IsoError } from './IsoError';

/**
 * An IsoError with a module property.
 */
export class ModuleError extends IsoError {
  /**
   * The module that defines this error.
   */
  public module: string
  constructor(module: string, description: string, ...errors: Error[]) {
    super(description, ...errors)
    this.module = module
  }
}
