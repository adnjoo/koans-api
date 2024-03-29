"use client";

import axios from "axios";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Card, CardProps } from "@/app/Card";
import { API_URL } from "@/lib/vars";

export default function Home() {
  const [data, setData] = React.useState<CardProps[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const koan = searchParams.get("koan");

  React.useEffect(() => {
    axios.get(API_URL).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  }, []);

  React.useEffect(() => {
    if (koan) {
      // Ensure the number is within the valid range of data length
      const newIndex = parseInt(koan as string, 10) - 1;
      if (!isNaN(newIndex) && newIndex >= 0 && newIndex < data.length) {
        setCurrentCardIndex(newIndex);
      }
    }
  }, [koan, data]);

  const goToNextCard = () => {
    const isLastCard = currentCardIndex === data.length - 1;
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (isLastCard) {
      setCurrentCardIndex(0);
    }
    const url = new URL(window.location.href);
    url.searchParams.set(
      "koan",
      isLastCard ? "1" : (currentCardIndex + 2).toString()
    );
    router.push(url.toString());
  };

  const goToPreviousCard = () => {
    let nextIndex = currentCardIndex;
    if (currentCardIndex > 0) {
      nextIndex = currentCardIndex - 1;
    } else if (currentCardIndex === 0) {
      nextIndex = data.length - 1;
    }
    setCurrentCardIndex(nextIndex);
    const url = new URL(window.location.href);
    url.searchParams.set("koan", (nextIndex + 1).toString());
    router.push(url.toString());
  };

  return (
    <main className="flex flex-col min-h-screen items-center mx-4 sm:mx-32">
      <a href="/">
        <h1 className="my-4 sm:my-6 text-3xl sm:text-5xl">Zen Koans</h1>
      </a>
      <div className="my-4 flex flex-row items-center gap-4">
        {data[currentCardIndex] && (
          <Card
            title={data[currentCardIndex].title}
            link={data[currentCardIndex].link}
            description={data[currentCardIndex].description}
            image={data[currentCardIndex].image}
            audio={data[currentCardIndex].audio}
          />
        )}
      </div>
      <div className="my-4 sm:my-6 text-lg sm:text-xl gap-4 flex">
        <button
          onClick={goToPreviousCard}
          className="hover:text-gray-500 transition"
        >
          ← Previous
        </button>
        <button
          onClick={goToNextCard}
          className="hover:text-gray-500 transition"
        >
          Next →
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.set(
              "koan",
              Math.floor(Math.random() * data.length + 1).toString()
            );
            router.push(url.toString());
          }}
          className="hover:underline"
        >
          🎲
        </button>
      </div>
    </main>
  );
}
