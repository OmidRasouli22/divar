export const isTrue = (value) => ["true", "True", 1, true].includes(value);
export const isFalse = (value) =>
  ["false", "False", 0, false, null, undefined].includes(value);
