import a from 'assertron';
import { ModuleError } from '.';

test('with module', () => {
  const e = new ModuleError('iso-error', 'mod')

  a.satisfies(e, { module: 'iso-error' })
})
