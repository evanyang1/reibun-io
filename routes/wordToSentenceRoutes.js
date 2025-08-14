const express = require("express");
const WordToSentence = require("../models/wordToSentenceModel");

const wordToSentenceRouter = express.Router();

wordToSentenceRouter.get("/:word", async (req, res) => {
  const word = req.params.word;

  try {
    const wordToSentence = await WordToSentence.findOne({ word: word });
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
  const { sentence } = req.body;

  // Basic validation for the incoming sentence
  if (!sentence || typeof sentence !== "string" || sentence.trim() === "") {
    return res
      .status(400)
      .json({ error: "A non-empty 'sentence' string is required in the body" });
  }

  try {
    // Find a document by `word` and push the new sentence into its `sentences` array.
    // The `upsert: true` option creates the document if it doesn't exist.
    // The `new: true` option returns the modified document rather than the original.
    const updatedDoc = await WordToSentence.findOneAndUpdate(
      { word: word },
      { $push: { sentences: sentence } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(updatedDoc);
  } catch (error) {
    console.error("Error adding sentence:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = wordToSentenceRouter;
