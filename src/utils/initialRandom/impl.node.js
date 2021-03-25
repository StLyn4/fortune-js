const exportModule = async () => {
  const crypto = await import(/* webpackIgnore:true */ `crypto`);

  const randomBytes = (size = 0) => crypto.randomBytes(size);
  const randomInt = () => crypto.randomInt(0xffffffff);

  return { randomBytes, randomInt };
};

export default exportModule;
