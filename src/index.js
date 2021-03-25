import { randomBytes, randomInt } from '@/initialRandom';

import XorShift from './Algo/XorShift+';
import MersenneTwister from './Algo/MT';
import Fortune from './Algo/Fortune';

const randomizers = {
  XorShift: await XorShift.create(randomBytes(16)),
  MersenneTwister: await MersenneTwister.create(randomInt()),
  Fortune: await Fortune.create([randomBytes(32)]),
};

const random = (algorithm = 'Fortune') => {
  if (!Object.prototype.hasOwnProperty.call(randomizers, algorithm)) {
    throw new Error(`The Algorithm of Random "${algorithm}" does not exist`);
  }
  return randomizers[algorithm];
};

const FurtuneRandomBytes = randomizers.Fortune.randomBytes;

export { FurtuneRandomBytes as randomBytes };
export default random;
