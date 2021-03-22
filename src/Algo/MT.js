import RandomBase from './RandomBase';

class MersenneTwister extends RandomBase {
  constructor(seed, regSize = 624, period = 397) {
    if (seed === undefined || seed > 0xffffffff) {
      throw new TypeError('seed must be a 32-bit integer');
    }
    super();

    this._reg = new Int32Array(regSize);
    this._period = period;

    this._reg[0] = seed;
    for (this._index = 1; this._index < regSize; this._index++) {
      this._reg[this._index] =
        0x6c078965 *
          (this._reg[this._index - 1] ^ (this._reg[this._index - 1] >>> 30)) +
        this._index;
    }
    this._index = 0;
  }

  _generateNumbers = () => {
    for (let i = 0; i < this._reg.length; i++) {
      const y =
        (this._reg[i] & 0x80000000) +
        (this._reg[(i + 1) % this._reg.length] & 0x7fffffff);
      this._reg[i] =
        this._reg[(i + this._period) % this._reg.length] ^ (y >>> 1);
      if (y % 2) {
        this._reg[i] ^= 0x9908b0df;
      }
    }
  };

  _random = () => {
    if (this._index === 0) {
      this._generateNumbers();
    }

    let y = this._reg[this._index];
    y ^= y >>> 1;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    this._index = (this._index + 1) % this._reg.length;

    return y;
  };

  random = () => {
    return (this._random() + 0x7fffffff) / 0xffffffff;
  };
}

export default MersenneTwister;
