import loadSHA256 from '@/SHA256';

let SHA256 = null;

class SHAd256 {
  static async create(data = '') {
    if (SHA256 === null) {
      const SHA256Module = await loadSHA256();
      SHA256 = SHA256Module.SHA256;
    }
    return new SHAd256(data);
  }

  constructor(data = '') {
    this.hash = new SHA256(data);
    this.hash.update(data);
  }

  digest = async () => {
    const inner = await this.hash.digest();
    const outter = await new SHA256(inner).digest();
    return outter;
  };

  update = (data = '') => {
    this.hash.update(data);
    return this;
  };

  reset = () => {
    this.hash = new SHA256();
    return this;
  };
}

export default SHAd256;
