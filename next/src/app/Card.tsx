import React from "react";

export type CardProps = {
  link: string;
  title: string;
  description: string;
  image?: string;
};

export default function CardExample({
  link,
  title,
  description,
  image,
}: CardProps) {
  return (
    <div className="flex items-center justify-center mt-8 max-w-[400px] sm:max-w-3xl">
      <div
        className="max-w-5xl mx-auto bg-white rounded-md overflow-hidden border"
        style={{ boxShadow: "4px 4px grey" }}
      >
        <a
          href={link}
          className="block p-4 text-xl font-bold text-center text-blue-500 hover:underline"
          target="_blank"
        >
          {title}
        </a>
        {image && (
          <img
            src={`/pics/${image}`}
            alt={title}
            className="w-full max-w-[200px] rounded-xl mx-auto"
          />
        )}
        <div className="p-4 text-md text-center text-gray-700">
          {description}
        </div>
      </div>
    </div>
  );
}
