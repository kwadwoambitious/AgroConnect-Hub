import React from "react";
import { Link } from "react-router-dom";

const CategoryModal = ({ setIsCategoryOpen, isCategoryOpen }) => {
  return (
    <div>
      <ul className="animate__animated animate__zoomIn absolute left-0 mt-2 w-56 bg-white text-[18px] text-[#0f172ac7] font-bold transition-opacity duration-300 ease-in-out shadow-[0px_0px_19px_3px_rgba(0,0,0,0.1);] rounded-md">
        <Link
          to="/category/fruits"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <li className="px-5 py-4 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
            Fruits
          </li>
        </Link>

        <hr />

        <Link
          to="/category/vegetables"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <li className="px-5 py-4 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
            Vegetables
          </li>
        </Link>

        <hr />

        <Link
          to="/category/roots-and-tubers"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <li className="px-5 py-4 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
            Root and Tubers
          </li>
        </Link>
        <hr />

        <Link
          to="/category/grains-and-cereals"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <li className="px-5 py-4 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
            Grains and Cereals
          </li>
        </Link>
        <hr />

        <Link
          to="/category/herbs-and-spices"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <li className="px-5 py-4 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
            Herbs and Spices
          </li>
        </Link>
        <hr />

        <Link
          to="/category/legumes-and-pulses"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <li className="px-5 py-4 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
            Legumes and Pulses
          </li>
        </Link>
        <hr />

        <Link
          to="/category/nuts-and-seeds"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <li className="px-5 py-4 hover:bg-gray-100 hover:text-[#2E982D] text-[15px] font-semibold">
            Nuts and Seeds
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default CategoryModal;
