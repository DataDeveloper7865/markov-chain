/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    // MORE CODE HERE
    this.words = words;
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // MORE CODE HERE
    let markovObj = {};
    for (let i = 0; i < this.words.length; i++) {
      if (i == this.words.length - 1) {
        if (!markovObj[this.words[i]]) {
          markovObj[this.words[i]] = [null];
        } else {
          markovObj[this.words[i]].push(null);
        }
      } else if (!markovObj[this.words[i]]) {
        markovObj[this.words[i]] = [this.words[i + 1]];
      } else {
        markovObj[this.words[i]].push(this.words[i + 1]);
      }
    }
    return markovObj;
  }

  /** return random text from chains */

  getText(numWords = 100) {
    // MORE CODE HERE
    let markovArray = [];
    let markovObj = this.makeChains();
    let randKey = this.startRandomWord(markovObj);
    console.log("getTextrand key: ", randKey)
    while (markovArray.length < numWords) {
      let randVal = this.getRandomWordInArray(markovObj, randKey);
      markovArray.push(randVal);
      randKey = randVal;
    }
    return markovArray.join(" ");
  }

  startRandomWord(obj) {
    let objKeys = Object.keys(obj);

    return objKeys[Math.floor(Math.random() * objKeys.length)];
  }

  getRandomWordInArray(obj, randomKey) {
    console.log("getrandomword: ", randomKey)
    let lengthOfValueArray = obj[randomKey].length;
    let randomVal = obj[randomKey][Math.floor(Math.random() * lengthOfValueArray)];

    return randomVal;
  }
}

module.exports = {
  MarkovMachine
};
