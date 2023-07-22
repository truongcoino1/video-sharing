"use client";

import { HomePage } from "@/modules/home/pages";

export default function Home() {
  return (
    <main className="flex bg-light-100 min-h-screen flex-col items-center">
      <div className="max-w-[960px] w-full lg:px-0 px-24">
        <HomePage />
      </div>
    </main>
  );
}
