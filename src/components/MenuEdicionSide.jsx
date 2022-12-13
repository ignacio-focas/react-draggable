import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import React, { useState } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";

function MenuEdicionSide(props) {
  const { modoEdicion, values, handleMostrar } = props;
  const [variableSeleccionada, setVariableSeleccionada] = useState("");

  const handleChange = (e) => {
    setVariableSeleccionada(e.target.value);
  };

  return (
    modoEdicion && (
      <div className="container-valores">
        <InputLabel id="variable">Elegir variable</InputLabel>
        <Select
          value={variableSeleccionada}
          labelId="variable"
          onChange={handleChange}
        >
          {values.map((val) => {
            return (
              <MenuItem key={val.id} value={val.id}>
                {val.Label}
              </MenuItem>
            );
          })}
        </Select>

        <Button
          onClick={() => handleMostrar(variableSeleccionada)}
          content="Añadir"
          color="teal"
        />
        <hr />
        {/* {values.map((dummy) => {
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
        })} */}
      </div>
    )
  );
}

export default MenuEdicionSide;
