import SHAd256 from './SHAd256';

class Pool {
  constructor() {
    this.reset();
  }

  digest = () => this.hash.digest();

  update = (data = '') => {
    this.hash.update(data);
    this.length += data.length;
    return this;
  };

  reset = () => {
    this.hash = new SHAd256();
    this.length = 0;
    return this;
  };
}

export default Pool;
