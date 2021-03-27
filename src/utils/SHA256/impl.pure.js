/*
  This implementation is mostly a copy of the implementation of SHA256 in the js-sha256 library
  (created by Chen, Yi-Cyuan [emn178@gmail.com], https://github.com/emn178/js-sha256)
*/

const exportModule = () => {
  const EMPTY_BUFFER = Buffer.alloc(0);
  const EXTRA = [-2147483648, 8388608, 32768, 128];
  const SHIFT = [24, 16, 8, 0];

  // prettier-ignore
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  const H = [
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19,
  ];

  class SHA256 {
    constructor(data = EMPTY_BUFFER) {
      this.reset().update(data);
    }

    _hash = () => {
      let j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
      let [a, b, c, d, e, f, g, h] = this._h;
      const blocks = this._blocks;

      for (j = 16; j < 64; j++) {
        // rightrotate
        t1 = blocks[j - 15];
        s0 =
          ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
        t1 = blocks[j - 2];
        s1 =
          ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
        blocks[j] = (blocks[j - 16] + s0 + blocks[j - 7] + s1) << 0;
      }

      bc = b & c;
      for (j = 0; j < 64; j += 4) {
        if (this._first) {
          ab = 704751109;
          t1 = blocks[0] - 210244248;
          h = (t1 - 1521486534) << 0;
          d = (t1 + 143694565) << 0;
          this._first = false;
        } else {
          s0 =
            ((a >>> 2) | (a << 30)) ^
            ((a >>> 13) | (a << 19)) ^
            ((a >>> 22) | (a << 10));
          s1 =
            ((e >>> 6) | (e << 26)) ^
            ((e >>> 11) | (e << 21)) ^
            ((e >>> 25) | (e << 7));
          ab = a & b;
          maj = ab ^ (a & c) ^ bc;
          ch = (e & f) ^ (~e & g);
          t1 = h + s1 + ch + K[j] + blocks[j];
          t2 = s0 + maj;
          h = (d + t1) << 0;
          d = (t1 + t2) << 0;
        }
        s0 =
          ((d >>> 2) | (d << 30)) ^
          ((d >>> 13) | (d << 19)) ^
          ((d >>> 22) | (d << 10));
        s1 =
          ((h >>> 6) | (h << 26)) ^
          ((h >>> 11) | (h << 21)) ^
          ((h >>> 25) | (h << 7));
        da = d & a;
        maj = da ^ (d & b) ^ ab;
        ch = (h & e) ^ (~h & f);
        t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
        t2 = s0 + maj;
        g = (c + t1) << 0;
        c = (t1 + t2) << 0;
        s0 =
          ((c >>> 2) | (c << 30)) ^
          ((c >>> 13) | (c << 19)) ^
          ((c >>> 22) | (c << 10));
        s1 =
          ((g >>> 6) | (g << 26)) ^
          ((g >>> 11) | (g << 21)) ^
          ((g >>> 25) | (g << 7));
        cd = c & d;
        maj = cd ^ (c & a) ^ da;
        ch = (g & h) ^ (~g & e);
        t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
        t2 = s0 + maj;
        f = (b + t1) << 0;
        b = (t1 + t2) << 0;
        s0 =
          ((b >>> 2) | (b << 30)) ^
          ((b >>> 13) | (b << 19)) ^
          ((b >>> 22) | (b << 10));
        s1 =
          ((f >>> 6) | (f << 26)) ^
          ((f >>> 11) | (f << 21)) ^
          ((f >>> 25) | (f << 7));
        bc = b & c;
        maj = bc ^ (b & d) ^ cd;
        ch = (f & g) ^ (~f & h);
        t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
        t2 = s0 + maj;
        e = (a + t1) << 0;
        a = (t1 + t2) << 0;
      }

      this._h[0] = (this._h[0] + a) << 0;
      this._h[1] = (this._h[1] + b) << 0;
      this._h[2] = (this._h[2] + c) << 0;
      this._h[3] = (this._h[3] + d) << 0;
      this._h[4] = (this._h[4] + e) << 0;
      this._h[5] = (this._h[5] + f) << 0;
      this._h[6] = (this._h[6] + g) << 0;
      this._h[7] = (this._h[7] + h) << 0;
    };

    update = (data = EMPTY_BUFFER) => {
      if (this.finalized) {
        throw new Error('Hasher already finalized');
      }
      if (!(data instanceof Buffer)) {
        data = Buffer.from(data);
      }

      let i;
      let index = 0;
      const length = data.length;
      const blocks = this._blocks;

      while (index < length) {
        if (this._hashed) {
          this._hashed = false;
          blocks.fill(0);
          blocks[0] = this._block;
        }

        for (i = this._start; index < length && i < 64; index++) {
          blocks[i >> 2] |= data[index] << SHIFT[i++ & 3];
        }

        this._lastByteIndex = i;
        this._bytes += i - this._start;
        if (i >= 64) {
          this._block = blocks[16];
          this._start = i - 64;
          this._hash();
          this._hashed = true;
        } else {
          this._start = i;
        }
      }
      if (this._bytes > 0xffffffff) {
        this._hBytes += (this._bytes / 0x100000000) << 0;
        this._bytes %= 0xffffffff;
      }

      return this;
    };

    digest = () => {
      if (this.finalized) {
        throw new Error('Hasher already finalized');
      }
      this.finalized = true;

      const blocks = this._blocks;
      const i = this._lastByteIndex;

      blocks[16] = this._block;
      blocks[i >> 2] |= EXTRA[i & 3];
      this._block = blocks[16];
      if (i >= 56) {
        if (!this._hashed) {
          this._hash();
        }
        blocks.fill(0);
        blocks[0] = this._block;
      }
      blocks[14] = (this._hBytes << 3) | (this._bytes >>> 29);
      blocks[15] = this._bytes << 3;
      this._hash();

      // prettier-ignore
      return Buffer.from([
        (this._h[0] >> 24) & 0xFF, (this._h[0] >> 16) & 0xFF, (this._h[0] >> 8) & 0xFF, this._h[0] & 0xFF,
        (this._h[1] >> 24) & 0xFF, (this._h[1] >> 16) & 0xFF, (this._h[1] >> 8) & 0xFF, this._h[1] & 0xFF,
        (this._h[2] >> 24) & 0xFF, (this._h[2] >> 16) & 0xFF, (this._h[2] >> 8) & 0xFF, this._h[2] & 0xFF,
        (this._h[3] >> 24) & 0xFF, (this._h[3] >> 16) & 0xFF, (this._h[3] >> 8) & 0xFF, this._h[3] & 0xFF,
        (this._h[4] >> 24) & 0xFF, (this._h[4] >> 16) & 0xFF, (this._h[4] >> 8) & 0xFF, this._h[4] & 0xFF,
        (this._h[5] >> 24) & 0xFF, (this._h[5] >> 16) & 0xFF, (this._h[5] >> 8) & 0xFF, this._h[5] & 0xFF,
        (this._h[6] >> 24) & 0xFF, (this._h[6] >> 16) & 0xFF, (this._h[6] >> 8) & 0xFF, this._h[6] & 0xFF,
        (this._h[7] >> 24) & 0xFF, (this._h[7] >> 16) & 0xFF, (this._h[7] >> 8) & 0xFF, this._h[7] & 0xFF,
      ]);
    };

    reset = () => {
      this.finalized = false;

      this._hashed = false;
      this._first = true;
      this._blocks = Array(17).fill(0);

      this._block = 0;
      this._start = 0;
      this._bytes = 0;
      this._hBytes = 0;
      this._lastByteIndex = 0;

      this._h = H.slice();
      return this;
    };
  }

  return { SHA256 };
};

export default exportModule;
