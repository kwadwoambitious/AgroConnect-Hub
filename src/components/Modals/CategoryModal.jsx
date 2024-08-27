// CategoryModal.js
import React from "react";
import { Link } from "react-router-dom";

const CategoryModal = ({ setIsCategoryOpen, isCategoryOpen }) => {
  const categories = [
    "fruit",
    "vegetable",
    "grains-and-cereals",
    "dairy-products",
    "herbs-and-spices",
    "nuts-and-seeds",
    "honey-and-sweetners",
    "organic-products",
    "poultry",
  ];

  return (
    <div>
      <ul className="animate__animated animate__zoomIn absolute left-0 mt-2 w-56 bg-white text-[18px] text-[#0f172ac7] font-bold transition-opacity duration-300 ease-in-out shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] rounded-md">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/category/${category}`}
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <li className="px-5 py-3 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
              {category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryModal;
