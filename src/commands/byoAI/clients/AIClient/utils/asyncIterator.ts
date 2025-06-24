export const asyncIterator = (data: string) => ({
  [Symbol.asyncIterator]: async function* () {
    yield data;
  },
});
