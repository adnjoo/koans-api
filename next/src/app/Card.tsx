import React from "react";

export type CardProps = {
  link: string;
  title: string;
  description: string;
};

export default function CardExample({ link, title, description }: CardProps) {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="max-w-5xl mx-auto bg-white rounded-md overflow-hidden shadow-lg border">
        <a
          href={link}
          className="block p-4 text-xl font-bold text-center text-blue-500 hover:underline"
        >
          {title}
        </a>
        <div className="p-4 text-md text-center text-gray-700">
          {description}
        </div>
      </div>
    </div>
  );
}
