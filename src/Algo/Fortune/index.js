import RandomBase from '../RandomBase';
import Pool from './Pool';
import Cache from './Cache';
import SHAd256 from './SHAd256';
import Generator from './Generator';

const POOLS_COUNT = 32;
const MIN_POOL_SIZE = 64;
const RESEED_INTERVAL = 100; // ms

class Fortune extends RandomBase {
  static async create(seeds, cacheSize = 100000) {
    const F = new Fortune(seeds, cacheSize);

    F._generator = await Generator.create();

    F._pools = Array(POOLS_COUNT);
    for (let i = 0; i < POOLS_COUNT; i++) {
      F._pools[i] = await Pool.create();
    }

    F._cacheSize = cacheSize;
    F._bytesCache = new Cache(cacheSize, (size) =>
      F._generator.randomBytes(size),
    );

    await Promise.all(
      seeds.map(async (seed, poolIndex) => await F.feed(poolIndex, seed)),
    );

    return F;
  }

  _reseedCount = 0;
  _lastReseed = null;

  constructor(seeds) {
    if (!Array.isArray(seeds) || seeds.length === 0 || seeds.length > 32) {
      throw new TypeError(
        'seed must be an array with the number of elements from 1 to 32',
      );
    }
    super();
  }

  _choosePools = () => {
    const pools = [];

    for (let i = 0; i < POOLS_COUNT; i++) {
      if (this._reseedCount % 2 ** i === 0) {
        pools.push(this._pools[i]);
      } else {
        break;
      }
    }

    return pools;
  };

  _reseed = async (time = Date.now()) => {
    this._reseedCount++;
    const pools = this._choosePools();
    const seed = Array(pools.length);

    for (let i = 0; i < pools.length; i++) {
      seed[i] = await pools[i].digest();
      pools[i].reset();
    }

    this._lastReseed = time;
    await this._generator.reseed(Buffer.concat(seed));
  };

  _random = async (size) => {
    const time = Date.now();

    if (this._lastReseed !== null && this._lastReseed > time) {
      console.warn('The clock was rewind back!');
      this._lastReseed = null;
    }

    if (
      this._pools[0].length >= MIN_POOL_SIZE &&
      (this._lastReseed === null || time > this._lastReseed + RESEED_INTERVAL)
    ) {
      await this._reseed(time);
      this._bytesCache.clear();
    }

    if (this._cacheSize < size) {
      const bytes = this._generator.randomBytes(size);
      return bytes;
    } else {
      return this._bytesCache.get(size);
    }
  };

  feed = async (poolIndex, bytes) => {
    this._pools[poolIndex]
      .update(bytes)
      .update(await new SHAd256(bytes).digest());
  };

  randomBytes = async (size = 0) => {
    const bytes = await this._random(size);
    return bytes;
  };

  random = async () => {
    const bytes = await this._random(4);
    return bytes.readUInt32BE() / 0xffffffff;
  };
}

export default Fortune;
