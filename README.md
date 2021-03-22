<h1 align="center">Welcome to Fortune-JS 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.3-blue.svg?cacheSeconds=2592000" />
  <a href="LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> *About:* The library that generates random numbers by 3 ways! Cryptographically strong Fortune? Fast XorShift+? Or maybe something mean? Fast and reliable Mersenne Twister? The choice is yours!

## Install

```sh
yarn install fortune-js
# or
npm install fortune-js
```

## Usage

```javascript
const random = require('random-js');

// In reality, you will most likely need only one type generator
const Fortune = random('Fortune') // Or just random()
const MT = random('MT');
const XorShift = random('XorShift');

console.log(Fortune.random()); // Prints a random number from 0 to 1
```

## Types of generators

*How to choose the generator you need?*

*1.* If you need cryptographic strong random, fast work (in fact, all 3 algorithms are very fast),
then your choice is `Fortune` (this algorithm even uses by Apple since 2019).

*2.* If you need a faster job, with still a very random selection, you can use the `Mersenne Twister` (`MT`).

*3.* `XorShift` also shows even higher speed, but not recommended for use, since there are more interesting algorithms.

## API

`randomObj.random()` - generates a number between 0 and 1

`randomObj.randInt([limit])` - Generates an integer between 0 and `limit`

`randomObj.randFloat([limit])` - Generates a float number between 0 and `limit`

`randomObj.randRange([from], [to])` - Generates an integer between `from` and `to`

`randomObj.randFloatRange([from], [to])` - Generates a float number between `from` and `to`

`randomObj.select(array, [n])` - Select `n` unique (by index) `array` elements

`randomObj.shuffle(array, [copy])` - Shuffle the contents of the `array`.
If the `copy` is true, then the a new array is also created.
Otherwise, all operations will be performed on the source array (default)

## Author

👤 **Vsevolod Volkov <st.lyn4@gmail.com>**

* Github: [@StLyn4](https://github.com/StLyn4)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/StLyn4/fortune-js/issues). You can also take a look at the [contributing guide](CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Vsevolod Volkov <st.lyn4@gmail.com>](https://github.com/StLyn4).<br />
This project is [MIT](LICENSE) licensed.
