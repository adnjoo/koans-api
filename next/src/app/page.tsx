"use client";

import axios from "axios";
import React from "react";

import CardExample from "./Card";

const api = process.env.NEXT_PUBLIC_API as string;

export default function Home() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    console.log(api);
    axios.get(api).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  React.useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <main className="flex min-h-screen flex-col mx-4 sm:mx-32">
      <div className="flex flex-col">
        {data &&
          data.map((d: any) => (
            <CardExample
              key={d.id}
              link={d.link}
              title={d.title}
              description={d.description}
            />
          ))}
      </div>
    </main>
  );
}
