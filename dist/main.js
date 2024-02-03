"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAddressToUsername = void 0;
var ethers_1 = require("ethers");
function hashAddressToSeed(ethereumAddress) {
    var bytes = ethers_1.ethers.utils.arrayify(ethereumAddress);
    var hash = ethers_1.ethers.utils.sha256(bytes);
    return BigInt('0x' + hash.substring(2));
}
function selectWordsAndNumber(ethereumAddress) {
    var seed = hashAddressToSeed(ethereumAddress);
    var words = [];
    var wordlist = ethers_1.ethers.wordlists.en;
    for (var i = 0; i < 3; i++) {
        var index = Number((seed + BigInt(i * 997)) % BigInt(2048));
        words.push(wordlist.getWord(index));
    }
    var number = Number(seed % BigInt(9000)) + 1000;
    return {
        words: words,
        number: number
    };
}
function convertAddressToUsername(ethereumAddress) {
    var capitalizeFirstLetter = function (word) { return word.charAt(0).toUpperCase() + word.slice(1); };
    try {
        var result = selectWordsAndNumber(ethereumAddress);
        var word1 = result.words[0];
        var word2 = capitalizeFirstLetter(result.words[2]);
        var number = result.number.toString();
        var username = word1 + word2 + number;
        return username;
    }
    catch (error) {
        console.error("Error:", error);
        return '';
    }
}
exports.convertAddressToUsername = convertAddressToUsername;
