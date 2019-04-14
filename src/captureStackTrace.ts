// This code comes from `make-error`

// istanbul ignore next
export const captureStackTrace = Error.captureStackTrace || function captureStackTrace(error) {
  const container = new Error();

  Object.defineProperty(error, 'stack', {
    configurable: true,
    get: function getStack() {
      const stack = container.stack;

      // Replace property with value for faster future accesses.
      Object.defineProperty(this, 'stack', {
        configurable: true,
        value: stack,
        writable: true
      });

      return stack;
    },
    set: function setStack(stack) {
      Object.defineProperty(error, 'stack', {
        configurable: true,
        value: stack,
        writable: true
      });
    }
  });
}
