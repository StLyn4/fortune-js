const exportModule = () => {
  const crypto = eval('require("crypto")');  // eslint-disable-line

  const encrypt = async (data, key, counter) => {
    const cipher = crypto.createCipheriv('aes-256-ctr', key, counter);
    const buf = Buffer.concat([cipher.update(data), cipher.final()]);
    return buf;
  };

  return { encrypt };
};

export default exportModule;
