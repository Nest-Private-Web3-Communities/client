import React from "react";
import Hero from "./components/Hero";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Hero />

      <div className="mt-2">
        <Link to="/communities">das</Link>
      </div>
    </>
  );
}
