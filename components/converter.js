export const htmlObjectConverter = {
  fromAttribute: (value) => JSON.parse(decodeURIComponent(value)),
  toAttribute: (value) => encodeURIComponent(JSON.stringify(value)),
};
