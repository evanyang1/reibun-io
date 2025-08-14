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

module.exports = wordToSentenceRouter;
