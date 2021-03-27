const exportModule = () => {
  const crypto = window.crypto;
  if (crypto === undefined) {
    throw new Error();
  }

  const randomBytes = (size = 0) => {
    return crypto.getRandomValues(Buffer.allocUnsafe(size));
  };

  const randomInt = () => {
    return randomBytes(4).readUint32BE();
  };

  return { randomBytes, randomInt };
};

export default exportModule;
