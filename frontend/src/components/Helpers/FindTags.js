import React, { useState } from 'react';
import natural from 'natural';

const BrownCorpus = natural.BrownCorpus;
const tokenizer = new natural.WordTokenizer();

function UnusualWords({paragraph}) {
  const [text, setText] = useState('');
  const [unusualWords, setUnusualWords] = useState([]);

  const findUnusualWords = () => {
    const brown = new BrownCorpus();
    const words = tokenizer.tokenize(text);
    const wordFreqs = brown.words().reduce((freqs, word) => {
      const lcWord = word.toLowerCase();
      freqs[lcWord] = (freqs[lcWord] || 0) + 1;
      return freqs;
    }, {});
    const unusualWords = words.filter(word => wordFreqs[word.toLowerCase()] <= 1);
    setUnusualWords(unusualWords);
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      <button onClick={findUnusualWords}>Find Unusual Words</button>
      <ul>
        {unusualWords.map((word, i) => <li key={i}>{word}</li>)}
      </ul>
    </div>
  );
}

export default UnusualWords;