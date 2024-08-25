import React from "react";
import styles from "./Card.module.css";
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 25, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const Card = ({ id, title, description, isActive, onClick }) => {
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Tilt options={defaultOptions}>
      <div
        className={` ${
          isActive ? styles.activeCard : ""
        } h-auto relative flex flex-col rounded-lg shadow-black hover:shadow-2xl z-10`}
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
            <section
              className="font-bold text-xl flex items-center justify-center text-center h-full p-1 bg-slate-100 mx-4 rounded-lg mt-1"
              style={{ color: getRandomColor() }}
            >
              {id}
            </section>
          </div>
        </div>

        {/* Bottom section of card */}
        <div
          className={`${styles.cardBottom} bg-gradient-to-br from-blue-950 to-blue-950/50 bg-blue-950/50 backdrop:blur-sm h-[6rem] w-[15rem] p-3`}
        >
          <h3 className="text-white font-bold truncate">{title}</h3>
          <p className="text-slate-400 text-sm my-2">{description}</p>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
