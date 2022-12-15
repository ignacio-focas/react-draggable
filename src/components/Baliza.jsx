import React, { useState, useEffect } from "react";

function Baliza(props) {
  const { forma, estado } = props;

  const [color, setColor] = useState("");

  const definirColor = (estado) => {
    estado ? setColor("green") : setColor("red");
  };

  useEffect(() => {
    definirColor(estado);
  }, [estado]);

  let borde = forma === "circulo" ? "50%" : forma === "cuadrado" ? "0" : null;

  return (
    <>
      <div
        style={{
          height: "50px",
          width: "50px",
          backgroundColor: `${color}`,
          borderRadius: `${borde}`,
          border: "solid 1px black",
        }}
      ></div>
      <p style={{ textAlign: "center" }}>variable</p>
    </>
  );
}

export default Baliza;
