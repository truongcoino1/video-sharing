export function flushPromises(timeout = 0): Promise<unknown> {
    return new Promise(function (resolve) {
      setTimeout(resolve, timeout);
    });
  }
  