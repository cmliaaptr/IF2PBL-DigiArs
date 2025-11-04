"use client";
import Image from "next/image";
import { useEffect } from "react";
import "flowbite";

export default function Home() {
  useEffect(() => {
    import("flowbite");
  }, []);

  return (
    <p>Hello world!</p>
  );
}
