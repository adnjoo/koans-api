"use client";
import { useRouter } from "next/navigation";

const numbers = Array.from({ length: 101 }, (_, i) => i + 1);

export const Footer = () => {
  const router = useRouter();

  const setCurrentCardIndex = (index: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("koan", index.toString());
    router.push(url.toString());
  };

  return (
    <div className="mb-12 flex flex-col justify-center">
      <a
        className="flex flex-row items-center hover:underline"
        href="https://github.com/adnjoo/koans-api"
        target="_blank"
      >
        <img src="/github.svg" alt="github logo" className="h-4 w-4 mr-1" />
        GitHub
      </a>
      <div className="inline-block max-w-screen">
        {numbers.map((number) => (
          <button key={number} onClick={() => setCurrentCardIndex(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};
