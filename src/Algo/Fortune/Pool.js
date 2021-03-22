import SHAd256 from './SHAd256';

class Pool extends SHAd256 {
  constructor() {
    super();
    this.reset();
  }

  update = (data = '') => {
    super.update(data);
    this.length += data.length;
    return this;
  };

  reset = () => {
    super.reset();
    this.length = 0;
    return this;
  };
}

export default Pool;
