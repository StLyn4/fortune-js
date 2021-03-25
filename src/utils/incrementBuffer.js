const incrementBuffer = (buf) => {
  for (let i = buf.length - 1; i >= 0; i--) {
    if (buf[i] === 0xff) {
      buf[i] = 0;
    } else {
      buf[i]++;
      break;
    }
  }
  return buf;
};

export default incrementBuffer;
