module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  isProduction: process.env.NODE_ENV === 'production',
  openAIKey: process.env.OPENAI_API_KEY
};

  