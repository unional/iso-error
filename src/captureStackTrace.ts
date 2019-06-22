// istanbul ignore file
// This code comes from `make-error`

export const captureStackTrace = Error.captureStackTrace || function (error) {
  const container = new Error();

  Object.defineProperty(error, 'stack', {
    configurable: true,
    get: function () {
      // Replace property with value for faster future accesses.
      defineStack(this, container.stack)
      return container.stack;
    },
    set: function (stack) { defineStack(error, stack) }
  });
}

function defineStack(target: Object, value: string | undefined) {
  Object.defineProperty(target, 'stack', {
    configurable: true,
    value,
    writable: true
  });
}
