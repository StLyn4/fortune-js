const exportModule = () => {
  const crypto = window.crypto;
  if (crypto === undefined || crypto.subtle === undefined) {
    throw new Error();
  }

  const encrypt = async (data, key, counter) => {
    const encodedKey = await crypto.subtle.importKey(
      'raw',
      key,
      'AES-CTR',
      false,
      ['encrypt', 'decrypt'],
    );
    const buf = await window.crypto.subtle.encrypt(
      {
        name: 'AES-CTR',
        counter,
        length: 32,
      },
      encodedKey,
      data,
    );
    return Buffer.from(buf);
  };

  return { encrypt };
};

export default exportModule;
