import RandomBase from './RandomBase';

class XorShift extends RandomBase {
  constructor(seed) {
    if (!Array.isArray(seed) || seed.length !== 4) {
      throw new TypeError('seed must be an array with 4 numbers');
    }
    super();

    // uint64_t s = [seed ...]
    this._state0U = seed[0] | 0;
    this._state0L = seed[1] | 0;
    this._state1U = seed[2] | 0;
    this._state1L = seed[3] | 0;
  }

  _random = () => {
    // uint64_t s1 = s[0]
    let s1U = this._state0U;
    let s1L = this._state0L;
    // uint64_t s0 = s[1]
    const s0U = this._state1U;
    const s0L = this._state1L;

    // result = s0 + s1
    const sumL = (s0L >>> 0) + (s1L >>> 0);
    const resU = (s0U + s1U + ((sumL / 2) >>> 31)) >>> 0;
    const resL = sumL >>> 0;

    // s[0] = s0
    this._state0U = s0U;
    this._state0L = s0L;

    // - t1 = [0, 0]
    let t1U = 0;
    let t1L = 0;
    // - t2 = [0, 0]
    let t2U = 0;
    let t2L = 0;

    // s1 ^= s1 << 23;
    // :: t1 = s1 << 23
    const a1 = 23;
    const m1 = 0xffffffff << (32 - a1);
    t1U = (s1U << a1) | ((s1L & m1) >>> (32 - a1));
    t1L = s1L << a1;
    // :: s1 = s1 ^ t1
    s1U = s1U ^ t1U;
    s1L = s1L ^ t1L;

    // t1 = ( s1 ^ s0 ^ ( s1 >> 17 ) ^ ( s0 >> 26 ) )
    // :: t1 = s1 ^ s0
    t1U = s1U ^ s0U;
    t1L = s1L ^ s0L;
    // :: t2 = s1 >> 18
    const a2 = 18;
    const m2 = 0xffffffff >>> (32 - a2);
    t2U = s1U >>> a2;
    t2L = (s1L >>> a2) | ((s1U & m2) << (32 - a2));
    // :: t1 = t1 ^ t2
    t1U = t1U ^ t2U;
    t1L = t1L ^ t2L;
    // :: t2 = s0 >> 5
    const a3 = 5;
    const m3 = 0xffffffff >>> (32 - a3);
    t2U = s0U >>> a3;
    t2L = (s0L >>> a3) | ((s0U & m3) << (32 - a3));
    // :: t1 = t1 ^ t2
    t1U = t1U ^ t2U;
    t1L = t1L ^ t2L;

    // s[1] = t1
    this._state1U = t1U;
    this._state1L = t1L;

    // return result
    return [resU, resL];
  };

  random = () => {
    const [rInt1, rInt2] = this._random();
    // Math.pow(2, -32) = 2.3283064365386963e-10
    // Math.pow(2, -52) = 2.220446049250313e-16
    return (
      rInt1 * 2.3283064365386963e-10 + (rInt2 >>> 12) * 2.220446049250313e-16
    );
  };
}

export default XorShift;
