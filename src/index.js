import { randomBytes, randomInt } from '@/initialRandom';

import XorShift from './Algo/XorShift+';
import MersenneTwister from './Algo/MT';
import Fortune from './Algo/Fortune';

const randomizerCreators = {
  XorShift: async () => await XorShift.create(randomBytes(16)),
  MersenneTwister: async () => await MersenneTwister.create(randomInt()),
  Fortune: async () => await Fortune.create([randomBytes(32)]),
};

const initedRandomizers = {};

const random = async (algorithm = 'Fortune') => {
  if (initedRandomizers[algorithm]) {
    return initedRandomizers[algorithm];
  }
  if (!Object.prototype.hasOwnProperty.call(randomizerCreators, algorithm)) {
    throw new Error(`The Algorithm of Random "${algorithm}" does not exist`);
  }
  const randomizer = await randomizerCreators[algorithm]();
  return randomizer;
};

export default random;
