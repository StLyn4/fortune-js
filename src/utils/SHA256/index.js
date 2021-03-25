import env from '@/env';

import loadNodeImpl from './impl.node';
import loadWebImpl from './impl.web';
import loadPureImpl from './impl.pure';

let module;

try {
  if (env === 'Node-Js') {
    module = await loadNodeImpl();
  } else if (env === 'Browser') {
    module = await loadWebImpl();
  } else {
    module = await loadPureImpl();
  }
} catch (e) {
  module = await loadPureImpl();
}

const { SHA256 } = module;
export default SHA256;
