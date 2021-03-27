import SHA256 from '@/SHA256';

class SHAd256 {
  constructor(data = '') {
    this.hash = new SHA256(data);
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
