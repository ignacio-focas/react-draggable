import React, { useState } from "react";
import { Button, Checkbox, Label, Menu } from "semantic-ui-react";
import { imagenes } from "../assets/NombresImagenes";

function MenuEdicionTop(props) {
  const { handleEdicion, handleClickImagen, verSelectorImagenes, color } =
    props;

  return (
    <Menu>
      <Menu.Item>
        <Label content="Modo Edición" color={color} size="large" />
        <Checkbox toggle onChange={() => handleEdicion()} />
      </Menu.Item>
      {verSelectorImagenes && (
        <Menu.Item>
          <Button.Group color="teal">
            <Button onClick={() => handleClickImagen(imagenes.ENVOLVEDORA)}>
              Envolvedora
            </Button>
            <Button onClick={() => handleClickImagen(imagenes.ESTUCHADORA)}>
              Estuchadora
            </Button>
            <Button onClick={() => handleClickImagen(imagenes.COMPRIMIDORA)}>
              Comprimidora
            </Button>
            <Button onClick={() => handleClickImagen(imagenes.ENTUBADORA)}>
              Entubadora
            </Button>
          </Button.Group>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default MenuEdicionTop;
