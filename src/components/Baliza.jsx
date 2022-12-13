import React from "react";
import { Draggable } from "react-draggable";

function Baliza(props) {
  const { color, forma, disableDrag, key: id, handleStop, positions } = props;

  let borde = forma == "circulo" ? "50%" : forma == "cuadrado" ? "0" : null;

  return (
    <>
      <Draggable
        disabled={disableDrag}
        key={id}
        onStop={handleStop}
        bounds="parent"
        defaultPosition={
          positions === null
            ? { x: 0, y: 0 }
            : !positions[id]
            ? { x: 0, y: 0 }
            : { x: positions[id].x, y: positions[id].y }
        }
      >
        <div
          style={{
            height: "50px",
            width: "50px",
            backgroundColor: `${color}`,
            borderRadius: `${borde}`,
          }}
        ></div>
      </Draggable>
    </>
  );
}

export default Baliza;
