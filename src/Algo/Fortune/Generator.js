import crypto from 'crypto';

import SHAd256 from './SHAd256';

const KEY_SIZE = 32;
const REKEY_LIMIT = 0x10000;
const EMPTY_BLOCK = Buffer.alloc(REKEY_LIMIT);
const EMPTY_KEY_BLOCK = Buffer.alloc(KEY_SIZE);

class Generator {
  _key = null;
  _iv = new BigUint64Array(2); // counter (+1 on each _encrypt)

  _randomBytesBlock = (encBlock) => {
    this.reseed(this._encrypt(EMPTY_KEY_BLOCK));
    return this._encrypt(encBlock);
  };

  _encrypt = (data) => {
    const cipher = crypto.createCipheriv('aes-256-ctr', this._key, this._iv);
    const ret = Buffer.concat([cipher.update(data), cipher.final()]);
    this._iv[1]++;
    return ret;
  };

  reseed = (seed) => {
    this._key = new SHAd256(
      Buffer.concat([this._key ?? EMPTY_KEY_BLOCK, seed]),
    ).digest();
  };

  randomBytes = (size) => {
    if (this._key === null) {
      throw new Error(
        'The generator must be seeded at least with 32 bytes of information in the first pool.',
      );
    }

    const fullBlocks = size >>> 16; // (int) size / (2**16)
    const remainder = size & 0xffff; // (int) size % 0x10000
    const buf = Array(fullBlocks + 1);

    for (let i = 0; i < fullBlocks; i++) {
      buf[i] = this._randomBytesBlock(EMPTY_BLOCK);
    }
    buf[fullBlocks] = this._randomBytesBlock(Buffer.alloc(remainder));
    // console.log(this._iv);
    return Buffer.concat(buf);
  };
}

export default Generator;
