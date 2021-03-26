import SHAd256 from './SHAd256';

class Pool {
  static async create() {
    const pool = new Pool();
    pool.hash = await SHAd256.create();
    pool.reset();
    return pool;
  }

  digest = () => this.hash.digest();

  update = (data = '') => {
    this.hash.update(data);
    this.length += data.length;
    return this;
  };

  reset = () => {
    this.hash.reset();
    this.length = 0;
    return this;
  };
}

export default Pool;
