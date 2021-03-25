let env;
let short;

if (typeof window === 'object') {
  env = 'Browser';
  short = 'web';
} else if (typeof window !== 'object' && typeof self === 'object') {
  env = 'Web-Worker';
  short = 'ww';
} else if (
  typeof process === 'object' &&
  process.versions &&
  process.versions.node
) {
  env = 'Node-Js';
  short = 'node';
} else if (
  typeof navigator !== 'undefined' &&
  navigator.product === 'ReactNative'
) {
  env = 'React-Native';
  short = 'rn';
}

export { short };
export default env;
