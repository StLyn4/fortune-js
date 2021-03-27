const exportModule = () => {
  const crypto = window.crypto;
  if (crypto === undefined || crypto.subtle === undefined) {
    throw new Error();
  }

  const EMPTY_BUFFER = Buffer.alloc(0);

  class SHA256 {
    _state = EMPTY_BUFFER;
    finalized = false;

    constructor(data = EMPTY_BUFFER) {
      this.update(data);
    }

    update = (data = EMPTY_BUFFER) => {
      if (this.finalized) {
        throw new Error('Hasher already finalized');
      }
      if (!(data instanceof Buffer)) {
        data = Buffer.from(data);
      }
      this._state = Buffer.concat([this._state, data]);

      return this;
    };

    digest = async () => {
      if (this.finalized) {
        throw new Error('Hasher already finalized');
      }
      this.finalized = true;
      const buf = await crypto.subtle.digest('SHA-256', this._state);
      return Buffer.from(buf);
    };

    reset = () => {
      this.finalized = false;
      this._state = EMPTY_BUFFER;
      return this;
    };
  }

  return { SHA256 };
};

export default exportModule;
