import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-body card--svg">
        <h5 className="card-title text-center">{props.title}</h5>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
