import { ethers } from 'ethers';

function hashAddressToSeed(ethereumAddress: string): bigint {
    const bytes = ethers.utils.arrayify(ethereumAddress);
    const hash = ethers.utils.sha256(bytes);
    return BigInt('0x' + hash.substring(2));
}

function selectWordsAndNumber(ethereumAddress: string): {words: string[], number: number} {
    const seed = hashAddressToSeed(ethereumAddress);
    const words: string[] = [];
    
    const wordlist = ethers.wordlists.en;
    
    for (let i = 0; i < 3; i++) {
        const index = Number((seed + BigInt(i * 997)) % BigInt(2048));
        words.push(wordlist.getWord(index)); 
    }

    const number = Number(seed % BigInt(9000)) + 1000;

    return {
        words,
        number
    };
}

export function convertAddressToUsername(ethereumAddress: string): string {
    const capitalizeFirstLetter = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

    try {
        const result = selectWordsAndNumber(ethereumAddress);
        const word1 = result.words[0];
        const word2 = capitalizeFirstLetter(result.words[2]);
        const number = result.number.toString();

        const username = word1 + word2 + number;
        return username;
    } catch (error) {
        console.error("Error:", error);
        return '';
    }
}
