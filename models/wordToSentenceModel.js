const mongoose = require("mongoose");

const wordToSentenceSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  sentences: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sentence",
    },
  ],
});

module.exports = mongoose.model("WordToSentence", wordToSentenceSchema);
