export const htmlObjectConverter = {
  fromAttribute: (value) => value ? JSON.parse(decodeURIComponent(value)) : null,
  toAttribute: (value) => value ? encodeURIComponent(JSON.stringify(value)) : null,
};
