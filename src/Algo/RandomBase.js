const DEFAULT_LIMIT = 0xffffffff - 1;

class RandomBase {
  random = () => {
    throw new TypeError('It is forbidden to use RandomBase directly');
  };

  randInt = (limit = DEFAULT_LIMIT) => {
    return Math.round(limit * this.random());
  };

  randFloat = (limit = DEFAULT_LIMIT) => {
    return limit * this.random();
  };

  randRange = (from = 0, to = DEFAULT_LIMIT) => {
    return Math.round((to - from) * this.random() + from);
  };

  randFloatRange = (from = 0, to = DEFAULT_LIMIT) => {
    return (to - from) * this.random() + from;
  };

  select = (array, n = 1) => {
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
        selectedIndex = this.randInt(array.length - 1);
      }
      ret[i] = array[selectedIndex];
      selected.add(selectedIndex);
    }

    return ret;
  };

  shuffle = (array, copy = false) => {
    if (copy) {
      array = array.slice();
    }

    for (let i = array.length - 1, j, tmp; i > 0; i--) {
      j = this.randInt(i);
      tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }

    return array;
  };
}

export default RandomBase;
