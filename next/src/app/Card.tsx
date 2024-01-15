import React from "react";
import parse from "html-react-parser";
import { classNames } from "@/lib/helpers";

export type CardProps = {
  link: string;
  title: string;
  description: string;
  image?: string;
  className?: string;
};

export function Card({
  link,
  title,
  description,
  image,
  className,
}: CardProps) {
  return (
    <div
      className={classNames(
        "flex items-center justify-center max-w-[400px] sm:max-w-3xl",
        className as string
      )}
    >
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
            className="w-full max-w-[200px] rounded-xl mx-auto sm:max-w-[400px]"
          />
        )}
        <div className="p-4 text-md text-center text-gray-700">
          {parse(description)}
        </div>
      </div>
    </div>
  );
}
