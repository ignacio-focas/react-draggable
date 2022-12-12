import React from "react";

function Baliza(props) {
  const { color, forma } = props;

  let borde = forma == "circulo" ? "50%" : forma == "cuadrado" ? "0" : null;

  return (
    <>
      <div
        style={{
          height: "50px",
          width: "50px",
          backgroundColor: `${color}`,
          borderRadius: `${borde}`,
        }}
      ></div>
    </>
  );
}

export default Baliza;
