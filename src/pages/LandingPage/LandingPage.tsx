import React from "react";
import Hero from "./components/Hero";
import { Link } from "react-router-dom";
import Loader from "../../common/Loader";

export default function LandingPage() {
  return (
    <>
      <Hero />

      <div className="flex justify-center items-center h-screen">
        <Loader className="w-1/4" />
      </div>
    </>
  );
}
