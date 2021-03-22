import RandomBase from '../RandomBase';
import Pool from './Pool';
import Cache from './Cache';
import SHAd256 from './SHAd256';
import Generator from './Generator';

const POOLS_COUNT = 32;
const MIN_POOL_SIZE = 64;
const RESEED_INTERVAL = 100; // ms

class Fortune extends RandomBase {
  _reseedCount = 0;
  _lastReseed = null;

  constructor(seeds, cacheSize = 100000) {
    if (!Array.isArray(seeds) || seeds.length === 0 || seeds.length > 32) {
      throw new TypeError(
        'seed must be an array with the number of elements from 1 to 32',
      );
    }
    super();

    this._generator = new Generator();
    this._pools = Array(POOLS_COUNT);
    for (let i = 0; i < POOLS_COUNT; i++) {
      this._pools[i] = new Pool();
    }

    this._cacheSize = cacheSize;
    this._bytesCache = new Cache(cacheSize, (size) =>
      this._generator.randomBytes(size),
    );

    seeds.map((seed, poolIndex) => this.feed(poolIndex, seed));
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

  _reseed = (time = Date.now()) => {
    this._reseedCount++;
    const pools = this._choosePools();
    const seed = Array(pools.length);

    for (let i = 0; i < pools.length; i++) {
      seed[i] = pools[i].digest();
      pools[i].reset();
    }

    this._lastReseed = time;
    this._generator.reseed(Buffer.concat(seed));
  };

  _random = (size) => {
    const time = Date.now();

    if (this._lastReseed !== null && this._lastReseed > time) {
      console.warn('The clock was rewind back!');
      this._lastReseed = null;
    }

    if (
      this._pools[0].length >= MIN_POOL_SIZE &&
      (this._lastReseed === null || time > this._lastReseed + RESEED_INTERVAL)
    ) {
      this._reseed(time);
      this._bytesCache.clear();
    }

    if (this._cacheSize < size) {
      return this._generator.randomBytes(size);
    } else {
      return this._bytesCache.get(size);
    }
  };

  feed = (poolIndex, bytes) => {
    this._pools[poolIndex].update(bytes).update(new SHAd256(bytes).digest());
  };

  random = () => {
    return this._random(4).readUInt32BE() / 0xffffffff;
  };
}

export default Fortune;
