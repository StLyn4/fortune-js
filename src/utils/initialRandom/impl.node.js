const exportModule = () => {
  const crypto = eval('require("crypto")');  // eslint-disable-line

  const randomBytes = (size = 0) => crypto.randomBytes(size);
  const randomInt = () => crypto.randomInt(0xffffffff);

  return { randomBytes, randomInt };
};

export default exportModule;
