import React, { useEffect, useState } from "react";
import "./style.css";

export const Scroll = (props) => {
  const [scrollTop, setScrollTop] = useState(0);
  console.log(props);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setScrollTop(window.pageYOffset);
    console.log(window.pageYOffset);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="scroll">
      <button
        className={`btn btn-info scroll-top ${
          scrollTop >= 500 ? "activate" : ""
        }`}
        onClick={handleClick}
      >
        <i className="fa fa-arrow-up">OK</i>
      </button>
    </div>
  );
};
