import React from "react";

export const CardWithImage = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
      <img
        className="w-full bg-cover h-full object-cover max-w-xs transition duration-300 ease-in-out hover:scale-110"
        src={`/img/contact-lenses-people/${image}`}
        alt="Card Image"
      />
      <div className="px-6 py-4 absolute -mt-16">
        <div className="font-bold text-2xl mb-2 text-white font-cormorant-regular capitalize">
          {title}
        </div>
      </div>
    </div>
  );
};
