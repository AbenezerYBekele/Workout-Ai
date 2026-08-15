// polyfills.js

if (typeof globalThis.AbortSignal !== 'undefined') {
  if (typeof globalThis.AbortSignal.any !== 'function') {
    globalThis.AbortSignal.any = function (signals) {
      const controller = new AbortController();

      const abort = () => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      };

      for (const signal of signals) {
        if (signal.aborted) {
          abort();
          break;
        }

        signal.addEventListener('abort', abort, { once: true });
      }

      return controller.signal;
    };
  }
}

console.log(
  'POLYFILL CHECK:',
  typeof globalThis.AbortSignal?.any
);