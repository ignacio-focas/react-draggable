import { InputLabel, MenuItem, Select, Stack } from "@mui/material";
import React, { useState } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";

function MenuEdicionSide(props) {
  const { modoEdicion, values, handleMostrar, agregarBaliza } = props;
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
              !val.mostrar && (
                <MenuItem key={val.id} value={val.id}>
                  {val.Label}
                </MenuItem>
              )
            );
          })}
        </Select>

        <Button
          onClick={() => handleMostrar(variableSeleccionada)}
          content="Añadir"
          color="teal"
        />
        <hr />
        <Button
          content="Añadir baliza"
          color="teal"
          onClick={() => {
            agregarBaliza();
          }}
        />
      </div>
    )
  );
}

export default MenuEdicionSide;
