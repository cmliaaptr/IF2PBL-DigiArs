"use client";

import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";

export default function Costumer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}
