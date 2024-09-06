import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const UserReviews = () => {
  const [index, setIndex] = useState(0);
  const { name, job, image, text } = people[index];

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    } else if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
  return (
    <div className="px-5 lg:px-20 py-28 bg-white rewiew-background">
      <h2 className="font-extrabold text-[25px] sm:text-[40px] mb-2 text-center text-[#111827]">
        What Our Customers Say
      </h2>
      <p className="font-normal md:text-lg text-center text-[#6B7280]">
        Here's what our satisfied consumers are saying!
      </p>
      <div>
        <div className="underline mt-12 sm:mt-14"></div>
      </div>
      <article className="review ">
        <div className="img-container">
          <img src={image} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author font-bold">{name}</h4>
        <p className="job font-medium">{job}</p>
        <p className="info text-[14px] lg:text-[15px] px-4 lg:px-8">{text}</p>
        <div className="button-container">
          <button className="prev-btn" onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
      </article>
    </div>
  );
};

export default UserReviews;
