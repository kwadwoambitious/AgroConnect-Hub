import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const StarRating = ({ ratingsAverage }) => {
  const fullStars = Math.floor(ratingsAverage);
  const hasHalfStar = ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={index} className="text-[#ffc107] text-[12px] lg:text-[14px]" />
        ))}
      {hasHalfStar && <FaStarHalfAlt className="text-[#ffc107] text-[12px] lg:text-[14px]" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={index + fullStars + 1} className="text-[#ffc107] text-[12px] lg:text-[14px]" />
        ))}
    </div>
  );
};