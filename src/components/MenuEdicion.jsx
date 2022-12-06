import React from "react";
import { Button, Checkbox, Label, Menu } from "semantic-ui-react";
import { imagenes } from "./../assets/NombresImagenes";

function MenuEdicion(props) {
  const { handleEdicion, handleClickImagen, verSelectorImagenes } = props;
  return (
    <Menu>
      <Menu.Item>
        <Label content="Modo Edición" color="teal" />
        <Checkbox toggle onChange={() => handleEdicion()} />
      </Menu.Item>
      {verSelectorImagenes && (
        <Menu.Item>
          <Button.Group>
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

export default MenuEdicion;
