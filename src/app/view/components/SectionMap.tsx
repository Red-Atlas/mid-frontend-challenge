"use client";
import React from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

interface SectionMapProps {
  location: { lat: number; lng: number } | null; // Añadimos la prop location
}

export default function SectionMap({ location }: SectionMapProps) {
  return (
    <div className="">
      <Map location={location} />
    </div>
  );
}
