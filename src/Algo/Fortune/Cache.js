class Cache {
  _free = 0;

  constructor(cacheSize, generator) {
    this._size = cacheSize;
    this._generator = generator;
    this._pos = cacheSize; // END
  }

  _reGen() {
    this._data = this._generator(this._size);
    this._pos = 0;
    this._free = this._data.length;
  }

  _read(size = this._free) {
    if (size > this._free) {
      throw new Error('It is impossible to read more than saved');
    }

    const data = this._data.slice(this._pos, this._pos + size);
    this._pos += size;
    this._free -= size;

    return data;
  }

  clear() {
    this._free = 0;
  }

  get(size) {
    if (this._free === 0) {
      this._reGen();
    }
    if (this._free < size) {
      return Buffer.concat([this._read(), this._generator(size - this._free)]);
    }
    return this._read(size);
  }
}

export default Cache;
