const mongoose = require("mongoose");

const sentenceSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  englishTranslation: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
  }
});

module.exports = mongoose.model("Sentence", sentenceSchema);