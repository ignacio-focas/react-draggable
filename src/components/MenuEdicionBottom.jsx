import React from "react";
import { Button } from "semantic-ui-react";

function MenuEdicionBottom(props) {
  const { modoEdicion, values, handleMostrar } = props;
  return (
    modoEdicion && (
      <div className="container-valores">
        {values.map((dummy) => {
          return (
            !dummy.mostrar && (
              <Button
                key={dummy.id}
                id={dummy.id}
                content={dummy.Label}
                color="teal"
                onClick={() => handleMostrar(dummy.id)}
              />
            )
          );
        })}
      </div>
    )
  );
}

export default MenuEdicionBottom;
