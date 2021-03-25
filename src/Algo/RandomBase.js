const DEFAULT_LIMIT = 0xffffffff - 1;

class RandomBase {
  random = async () => {
    throw new TypeError('It is forbidden to use RandomBase directly');
  };

  randInt = async (limit = DEFAULT_LIMIT) => {
    const randVal = await this.random();
    return Math.round(limit * randVal);
  };

  randFloat = async (limit = DEFAULT_LIMIT) => {
    const randVal = await this.random();
    return limit * randVal;
  };

  randRange = async (from = 0, to = DEFAULT_LIMIT) => {
    const randVal = await this.random();
    return Math.round((to - from) * randVal + from);
  };

  randFloatRange = async (from = 0, to = DEFAULT_LIMIT) => {
    const randVal = await this.random();
    return (to - from) * randVal + from;
  };

  select = async (array, n = 1) => {
    if (n > array.length) {
      throw new Error(
        'It is impossible to choose more elements than the number of array elements',
      );
    }

    const ret = Array(n);
    const selected = new Set();
    let selectedIndex = -1;

    for (let i = 0; i < n; i++) {
      while (selectedIndex === -1 || selected.has(selectedIndex)) {
        selectedIndex = await this.randInt(array.length - 1);
      }
      ret[i] = array[selectedIndex];
      selected.add(selectedIndex);
    }

    return ret;
  };

  shuffle = async (array, copy = false) => {
    if (copy) {
      array = array.slice();
    }

    for (let i = array.length - 1, j, tmp; i > 0; i--) {
      j = await this.randInt(i);
      tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }

    return array;
  };
}

export default RandomBase;
