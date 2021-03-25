const exportModule = async () => {
  const crypto = await import(/* webpackIgnore:true */ `crypto`);

  const EMPTY_BUFFER = Buffer.alloc(0);

  class SHA256 {
    finalized = false;

    constructor(data = EMPTY_BUFFER) {
      this._hash = crypto.createHash('sha256');
      this._hash.update(data);
    }

    update = (data = EMPTY_BUFFER) => {
      if (this.finalized) {
        throw new Error('Hasher already finalized');
      }
      this._hash.update(data);
      return this;
    };

    digest = async () => {
      if (this.finalized) {
        throw new Error('Hasher already finalized');
      }
      this.finalized = true;
      return this._hash.digest();
    };

    reset = () => {
      this.finalized = false;
      this._hash = crypto.createHash('sha256');
      return this._hash;
    };
  }

  return { SHA256 };
};

export default exportModule;
