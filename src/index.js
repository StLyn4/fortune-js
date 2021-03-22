import crypto from 'crypto';

import XorShift from './Algo/XorShift+';
import MT from './Algo/MT';
import Fortune from './Algo/Fortune';

const randomizers = {
  XorShift: new XorShift([
    crypto.randomBytes(4).readUInt32BE(),
    crypto.randomBytes(4).readUInt32BE(),
    crypto.randomBytes(4).readUInt32BE(),
    crypto.randomBytes(4).readUInt32BE(),
  ]),
  MT: new MT(crypto.randomBytes(4).readUInt32BE()),
  Fortune: new Fortune([crypto.randomBytes(32)]),
};

const random = (algorithm = 'Fortune') => {
  if (!Object.prototype.hasOwnProperty.call(randomizers, algorithm)) {
    throw new Error(`The Algorithm of Random "${algorithm}" does not exist`);
  }
  return randomizers[algorithm];
};

export default random;
