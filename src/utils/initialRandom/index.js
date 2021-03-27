import env from '@/env';

import loadNodeImpl from './impl.node';
import loadWebImpl from './impl.web';
import loadPureImpl from './impl.pure';

let module = null;

try {
  if (env === 'Node-Js') {
    module = loadNodeImpl();
  } else if (env === 'Browser') {
    module = loadWebImpl();
  } else {
    module = loadPureImpl();
  }
} catch (e) {
  module = loadPureImpl();
}

const { randomBytes, randomInt } = module;
export { randomBytes, randomInt };
