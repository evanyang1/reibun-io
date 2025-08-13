import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="">
      <h1>Reibun.io</h1>
    </div>
  );
}
