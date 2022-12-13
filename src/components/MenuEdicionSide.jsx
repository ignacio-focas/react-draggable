import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";

function MenuEdicionSide(props) {
  const { modoEdicion, values, handleMostrar, agregarBaliza } = props;
  const [variableSeleccionada, setVariableSeleccionada] = useState("");
  const [formaBaliza, setFormaBaliza] = useState("circulo");

  const handleChange = (e) => {
    setVariableSeleccionada(e.target.value);
  };

  const handleFormaChange = (e) => {
    setFormaBaliza(e.target.value);
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
        <InputLabel id="baliza">Editar baliza</InputLabel>
        <Select
          value={formaBaliza}
          labelId="baliza"
          onChange={handleFormaChange}
        >
          <MenuItem value="circulo">Circulo</MenuItem>
          <MenuItem value="cuadrado">Cuadrado</MenuItem>
        </Select>
        <Button
          content="Añadir baliza"
          color="teal"
          onClick={() => {
            agregarBaliza(formaBaliza);
          }}
        />
      </div>
    )
  );
}

export default MenuEdicionSide;
