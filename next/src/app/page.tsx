"use client";

import axios from "axios";
import React from "react";
import { useRouter, useSearchParams } from 'next/navigation'

import {Card, CardProps} from "@/app/Card";
import { API_URL } from "@/lib/vars";

export default function Home() {
  const [data, setData] = React.useState<CardProps[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const router = useRouter();
  const searchParams = useSearchParams()
  const koan = searchParams.get('koan')

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
    const url = new URL(window.location.href);
    url.searchParams.set('koan', (currentCardIndex + 2).toString());
    router.push(url.toString());
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center mx-4 sm:mx-32">
    <h1 className='my-4 sm:my-12 text-3xl sm:text-5xl'>Zen Koans</h1>
    <div className="my-4 flex flex-col items-center sm:my-12">
      {data[currentCardIndex] && (
        <Card
          title={data[currentCardIndex].title}
          link={data[currentCardIndex].link}
          description={data[currentCardIndex].description}
          image={data[currentCardIndex].image}
        />
      )}
      <div className="flex mt-4">
        <button onClick={goToPreviousCard} className="mr-2">
          Previous
        </button>
        <button onClick={goToNextCard}>Next</button>
      </div>
    </div>
  </main>
  );
}
