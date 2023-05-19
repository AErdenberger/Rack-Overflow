const brown = {
    // Frequency counts of words in the Brown Corpus
    // You can obtain these counts from a file or an API
    // Here, we are using a small sample for illustration purposes
    "the": 69971,
    "and": 43688,
    "of": 34822,
    
  };
  
  // Tokenize the paragraph
  const paragraph = "This is a sample paragraph with some unusual word Hemochromatosis.";
  const tokens = paragraph.toLowerCase().split(/\W+/);
  
  // Determine the frequency of each word
  const freqDist = {};
  for (const word of tokens) {
    freqDist[word] = (freqDist[word] || 0) + 1;
  }
  
  // Identify common words
  const commonWords = new Set(["the", "and", "of", /* ... */]);
  
  // Identify unusual words
  const unusualWords = [];
  for (const word in freqDist) {
    if (!commonWords.has(word) && freqDist[word] < (brown[word] || 0)) {
      unusualWords.push(word);
    }
  }
  
