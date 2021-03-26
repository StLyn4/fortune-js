import loadInitialRandom from '@/initialRandom';

import XorShift from './Algo/XorShift+';
import MersenneTwister from './Algo/MT';
import Fortune from './Algo/Fortune';

const randomizerCreators = {
  XorShift: async () => {
    const { randomBytes } = await loadInitialRandom();
    const rand = await XorShift.create(randomBytes(16));
    return rand;
  },
  MersenneTwister: async () => {
    const { randomInt } = await loadInitialRandom();
    const rand = await MersenneTwister.create(randomInt());
    return rand;
  },
  Fortune: async () => {
    const { randomBytes } = await loadInitialRandom();
    const rand = await Fortune.create([randomBytes(32)]);
    return rand;
  },
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
