export function flushPromises(timeout = 0): Promise<unknown> {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeout);
  });
}

export const uniqueArrayById = (array: any[]) => {
  return array.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i && !!v.id);
};
