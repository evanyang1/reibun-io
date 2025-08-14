import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CiSearch } from "react-icons/ci";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="pt-20">
      <h1 className="text-7xl text-center font-bold text-teal-400">
        Reibun.io
      </h1>
      <h2 className="text-2xl text-center mt-4">
        Search for Japanese example sentences!
      </h2>
      <section className="mt-10 flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="i.e. 機会"
          className="w-96 rounded-md border border-gray-300 p-2.5 shadow-sm focus:border-blue-500
           focus:ring-teal-500 sm:text-sm"
        />
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-md bg-teal-500 px-4 py-2.5 text-sm font-semibold
           text-white shadow-sm hover:bg-teal-600 transition-colors focus-visible:outline focus-visible:outline-2 
           focus-visible:outline-offset-2 focus-visible:outline-blue-600 duration-300 ml-4"
        >
          <CiSearch size={20} />
          <span>Search</span>
        </button>
      </section>
    </div>
  );
}
