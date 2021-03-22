import crypto from 'crypto';

class SHAd256 {
  constructor(data = '') {
    this.hash = crypto.createHash('sha256');
    this.hash.update(data);
  }

  digest = (encoding = null) => {
    return crypto
      .createHash('sha256')
      .update(this.hash.digest())
      .digest(encoding);
  };

  update(data = '') {
    this.hash.update(data);
    return this;
  }

  reset() {
    this.hash = crypto.createHash('sha256');
    return this;
  }
}

export default SHAd256;
