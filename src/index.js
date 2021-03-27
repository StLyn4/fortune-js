import { randomBytes, randomInt } from '@/initialRandom';

import XorShift from './Algo/XorShift+';
import MersenneTwister from './Algo/MT';
import Fortune from './Algo/Fortune';

const randomizers = {
  XorShift: new XorShift(randomBytes(16)),
  MersenneTwister: new MersenneTwister(randomInt()),
  Fortune: new Fortune([randomBytes(32)]),
};

const random = (algorithm = 'MersenneTwister') => {
  if (!Object.prototype.hasOwnProperty.call(randomizers, algorithm)) {
    throw new Error(`The Algorithm of Random "${algorithm}" does not exist`);
  }
  return randomizers[algorithm];
};

const FortuneRandomBytes = randomizers.Fortune.randomBytes;

export default random;
export { FortuneRandomBytes as randomBytes };
