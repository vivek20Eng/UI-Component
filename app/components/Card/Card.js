import React from "react";
import styles from "./Card.module.css";

const Card = ({ id, title, description, isActive, onClick }) => {
  return (
    // Main section
    <div
      className={` ${
        isActive ? styles.activeCard : ""
      } h-auto relative flex flex-col`}
      onClick={onClick}
    >
      {/* Top section of card */}
      <div
        className={`${styles.card} relative h-[10rem] w-[15rem] bg-white border-b-8 border-black`}
      >
        <span
          className={`${styles.shadowAbsoluteCenter} absolute left-[50%] z-10 bottom-0 w-4 h-4 bg-transparent`}
        ></span>
        <span
          className={`${styles.shadowTopLeft} absolute left-0 z-10 top-[95px] w-4 h-4 bg-transparent`}
        ></span>
        {/* Absolute card section */}
        <div
          className={`${styles.cardAbsolute} absolute -bottom-[8px] h-12  w-6/12 border-t-8 border-r-8 border-black bg-blue-950`}
        >
          <span
            className={`${styles.shadowAbsoluteLeft} absolute left-0 w-4 h-4 bg-blue-950`}
          ></span>

          <span
            className={`${styles.shadowAbsoluteRight} absolute right-0 w-4 h-4 bg-blue-950`}
          ></span>

          <span
            className={`${styles.shadowAbsoluteBottom} absolute -right-4 bottom-0 w-4 h-4 bg-transparent`}
          ></span>
          <section class=" font-bold text-xl flex items-center justify-center text-center h-full p-2">
            {id}
          </section>
        </div>
      </div>

      {/* Bottom section of card */}
      <div
        className={`${styles.cardBottom} bg-blue-950 h-[6rem] w-[15rem] p-3`}
      >
        <h3 className="text-red-300 font-bold truncate">{title}</h3>
        <p className="text-slate-400 text-sm my-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
