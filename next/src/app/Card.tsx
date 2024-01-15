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
      className={`mx-auto bg-white rounded-md border flex flex-col ${image && `sm:flex-row`} items-center sm:items-start justify-center max-w-[400px] sm:max-w-3xl`}
      style={{ boxShadow: "4px 4px grey" }}
    >
      <div className='flex flex-col sm:sticky sm:top-[20px] w-full'>
        <a
          href={link}
          className="block p-4 text-lg font-bold text-center text-blue-500 hover:underline"
          target="_blank"
        >
          {title}
        </a>
        {image && (
          <img
            src={`/pics/${image}`}
            alt={title}
            className="w-full max-w-[200px] rounded-xl mx-auto sm:max-w-[400px] sm:sticky sm:top-0 sm:h-[400px] sm:w-[400px]"
          />
        )}
      </div>
      <div className="p-4 text-md text-center text-gray-700">
        <br />
        {parse(description)}
      </div>
    </div>
  );
}
