import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CiSearch } from "react-icons/ci";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="pt-20">
      <h1 className="text-7xl text-center font-bold text-blue-600">
        Reibun.io
      </h1>
      <h2 className="text-2xl text-center mt-4">
        Search for Japanese example sentences!
      </h2>
      <section className="flex flex-row items-center mt-10 justify-center">
        <input
          type="text"
          placeholder="i.e. 機会"
          className="mt-4 block mx-auto p-2 border border-gray-300 rounded"
        />
        <button className="bg-blue-200 rounded px-4 py-2 ml-2 text-blue-800 font-semibold hover:bg-blue-300 
        transition-colors duration-300">
          <span>
            <CiSearch />
          </span>
          Search
        </button>
      </section>
    </div>
  );
}
