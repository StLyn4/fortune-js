import loadEncrypt from '@/encryptor';
import incrementBuffer from '@/incrementBuffer';
import SHAd256 from './SHAd256';

const KEY_SIZE = 32;
const REKEY_LIMIT = 0x10000;
const EMPTY_BLOCK = Buffer.alloc(REKEY_LIMIT);
const EMPTY_KEY_BLOCK = Buffer.alloc(KEY_SIZE);

let encrypt = null;

class Generator {
  static async create() {
    if (encrypt === null) {
      const encryptorModule = await loadEncrypt();
      encrypt = encryptorModule.encrypt;
    }
    return new Generator();
  }

  _key = null;
  _iv = Buffer.alloc(16); // counter (+1 on each _encrypt

  _randomBytesBlock = async (encBlock) => {
    this.reseed(await this._encrypt(EMPTY_KEY_BLOCK));
    const block = await this._encrypt(encBlock);
    return block;
  };

  _encrypt = async (data) => {
    const ret = await encrypt(data, this._key, this._iv);
    incrementBuffer(this._iv);
    return ret;
  };

  reseed = async (seed) => {
    this._key = await new SHAd256(
      Buffer.concat([this._key ?? EMPTY_KEY_BLOCK, seed]),
    ).digest();
  };

  randomBytes = async (size) => {
    if (this._key === null) {
      throw new Error(
        'The generator must be seeded at least with 32 bytes of information in the first pool.',
      );
    }

    const fullBlocks = size >>> 16; // (int) size / (2**16)
    const remainder = size & 0xffff; // (int) size % 0x10000
    const buf = Array(fullBlocks + 1);

    for (let i = 0; i < fullBlocks; i++) {
      buf[i] = await this._randomBytesBlock(EMPTY_BLOCK);
    }
    buf[fullBlocks] = await this._randomBytesBlock(Buffer.alloc(remainder));
    return Buffer.concat(buf);
  };
}

export default Generator;
