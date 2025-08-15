import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({
    word: "",
    sentence: "",
    englishTranslation: "",
  });

  const checkWordInSentence = (word, sentence) => {
    return sentence.includes(word);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { word, sentence, englishTranslation } = formData;
    if (checkWordInSentence(word, sentence)) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/wordToSentence/${word}`, {
          sentence: sentence,
          englishTranslation: englishTranslation,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    } else {
      alert("Word not found in sentence");
    }
    setFormData({
      word: "",
      sentence: "",
      englishTranslation: "",
    });
  };

  return (
    <div className="pt-20">
      <section className="max-w-4xl mx-auto px-4">
        <h1 className="text-7xl text-center font-bold text-teal-400">Admin</h1>
      </section>
      <section className="max-w-4xl mx-auto px-4 mt-10">
        <h2 className="text-3xl text-center font-bold">Add new sentences</h2>
        <form className="mt-10 flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Word"
            className="w-full p-2.5 text-xl shadow-sm focus:border-teal-500
           focus:ring-teal-500"
            value={formData.word}
            onChange={(e) => setFormData({ ...formData, word: e.target.value })}
          />
          <input
            type="text"
            placeholder="Sentence"
            className="w-full p-2.5 text-xl shadow-sm focus:border-teal-500
           focus:ring-teal-500"
            value={formData.sentence}
            onChange={(e) => setFormData({ ...formData, sentence: e.target.value })}
          />
          <input
            type="text"
            placeholder="English Translation"
            className="w-full p-2.5 text-xl shadow-sm focus:border-teal-500
           focus:ring-teal-500"
           value={formData.englishTranslation}
            onChange={(e) =>
              setFormData({ ...formData, englishTranslation: e.target.value })
            }
          />
          <button
            className="flex items-center justify-center gap-2 rounded-md bg-teal-500 px-4 py-2.5 text-base font-semibold
           text-white shadow-sm hover:bg-teal-600 transition-colors focus-visible:outline focus-visible:outline-2
           focus-visible:outline-offset-2 focus-visible:outline-teal-600 duration-300 ml-5"
            onClick={handleSubmit}
          >
            Add
          </button>
        </form>
      </section>
    </div>
  );
}
