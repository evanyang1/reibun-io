import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wordToSentence/${searchTerm}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setSearchTerm("");
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

        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-teal-500 px-4 py-2.5 text-base font-semibold
           text-white shadow-sm hover:bg-teal-600 transition-colors focus-visible:outline focus-visible:outline-2
           focus-visible:outline-offset-2 focus-visible:outline-teal-600 duration-300 ml-5"
        >
          <CiSearch size={20} />
          <span>Search</span>
        </button>
      </form>
      <div>
        {searchResults.map((result) => (
          <div key={result._id}>
            <p>{result.text}</p>
            <p>{result.englishTranslation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
