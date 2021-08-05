import React from "react";
import "./style.css";

const Card = (props) => {
  return (
    <div
      className="card"
      style={{
        margin: `${props.margin}`,
        fontSize: `${props.fontSize}`,
        maxWidth: `${props.maxWidth}`
      }}
    >
      {(props.headerLeft || props.headerRight) && (
        <div
          className="cardHeader"
          style={{
            fontSize: `${props.fontSize}`,
          }}
        >
          {props.headerLeft && (
            <div
              style={{
                alignSelf: "center",
                fontSize: "20px",
                fontWeight: "500",
                fontSize: `${props.fontSize}`,
                cursor: "pointer",
              }}
            >
              {props.headerLeft}
            </div>
          )}
          {props.headerRight && (
            <div
              style={{
                cursor: "pointer",
              }}
            >
              {props.headerRight}
            </div>
          )}
        </div>
      )}

      {props.children}
    </div>
  );
};

export default Card;
