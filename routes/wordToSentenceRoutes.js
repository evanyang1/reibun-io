const express = require("express");
const WordToSentence = require("../models/wordToSentenceModel");
const Sentence = require("../models/sentenceModel");

const wordToSentenceRouter = express.Router();

wordToSentenceRouter.get("/:word", async (req, res) => {
  const word = req.params.word;
  console.log("wordToSentence.get: ", word);
  try {
    const wordToSentence = await WordToSentence.findOne({
      word: word,
    }).populate("sentences");
    if (!wordToSentence) {
      return res.status(404).json({ error: "Word not found" });
    }
    return res.json(wordToSentence);
  } catch (error) {
    console.error("Error fetching word to sentence:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /:word - Add a new example sentence to a word.
// This will create a new document if the word doesn't exist yet.
wordToSentenceRouter.post("/:word", async (req, res) => {
  const { word } = req.params;
  const { sentence, englishTranslation } = req.body;

  // Basic validation for the incoming sentence
  if (!sentence || typeof sentence !== "string" || sentence.trim() === "") {
    return res
      .status(400)
      .json({ error: "A non-empty 'sentence' string is required in the body" });
  }

  try {
    // First, create a new Sentence document
    const newSentence = new Sentence({
      text: sentence,
      englishTranslation: englishTranslation,
    });
    const savedSentence = await newSentence.save();

    // Then, find the WordToSentence document and push the sentence's ObjectId
    const updatedDoc = await WordToSentence.findOneAndUpdate(
      { word: word },
      { $push: { sentences: savedSentence._id } },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    console.log("wordToSentence.post: ", updatedDoc, " Success!");
    return res.status(200).json(updatedDoc);
  } catch (error) {
    console.error("Error adding sentence:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = wordToSentenceRouter;
