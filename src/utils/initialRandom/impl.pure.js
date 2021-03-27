const exportModule = () => {
  const randomBytes = (size = 0) => {
    const bytes = Buffer.allocUnsafe(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = Math.round(0xff * Math.random());
    }
    return bytes;
  };

  const randomInt = () => {
    return Math.round(0xffffffff * Math.random());
  };

  return { randomBytes, randomInt };
};

export default exportModule;
