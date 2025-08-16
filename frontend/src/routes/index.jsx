import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const termToSearch = searchTerm.trim();
    if (!termToSearch) return;

    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wordToSentence/${termToSearch}`
      );
      setSearchResults(response.data.sentences || []);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(`No results found for "${termToSearch}".`);
      } else {
        setError("An error occurred while fetching data. Please try again.");
        console.error("Error fetching data:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <h1 className="text-7xl text-center font-bold text-teal-400">
        Reibun.io
      </h1>
      <h2 className="text-2xl text-center mt-4">
        Search for Japanese example sentences!
      </h2>
      <form className="mt-10 flex items-center justify-center gap-2" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="i.e. 機会"
          className="w-96 rounded-md border border-gray-300 p-2.5 text-xl shadow-sm focus:border-teal-500
           focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search for a Japanese word"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-md bg-teal-500 px-4 py-2.5 text-base font-semibold
           text-white shadow-sm hover:bg-teal-600 transition-colors focus-visible:outline focus-visible:outline-2
           focus-visible:outline-offset-2 focus-visible:outline-teal-600 duration-300 ml-5 disabled:bg-gray-400"
        >
          <CiSearch size={20} />
          <span>{isLoading ? "Searching..." : "Search"}</span>
        </button>
      </form>
      <div className="max-w-4xl mx-auto px-4 mt-10 space-y-4">
        {searchResults.length > 0 && <h1 className="text-3xl font-bold text-center">{searchTerm}:</h1>}
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!isLoading &&
          !error &&
          searchResults.length > 0 &&
          searchResults.map((result) => (
          <div
            key={result._id}
            className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
          >
            <p className="text-lg text-gray-800">{result.text}</p>
            <p className="mt-2 text-gray-600">
              {result.englishTranslation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
