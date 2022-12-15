import React, { useEffect } from "react";
import { imagenes } from "../assets/NombresImagenes";
import Comprimidora from "./svgComponents/Comprimidora";
import Envolvedora from "./svgComponents/Envolvedora";
import Entubadora from "./svgComponents/Entubadora";
import Estuchadora from "./svgComponents/Estuchadora";
import { Box } from "@mui/material";

function ContainerImagen(props) {
  const { imagen, children, setImagen, setHasLoaded } = props;

  useEffect(() => {
    const imagenActual = JSON.parse(
      localStorage.getItem("imagen_seleccionada")
    );
    setImagen(imagenActual);
    setHasLoaded();
  }, []);

  useEffect(() => {
    localStorage.setItem("imagen_seleccionada", JSON.stringify(imagen));
  }, [imagen]);

  const selectorImagen = (imagen) => {
    switch (imagen) {
      case imagenes.COMPRIMIDORA:
        return <Comprimidora />;
      case imagenes.ENVOLVEDORA:
        return <Envolvedora />;
      case imagenes.ENTUBADORA:
        return <Entubadora />;
      case imagenes.ESTUCHADORA:
        return <Estuchadora />;
      default:
        return <Comprimidora />;
    }
  };

  return (
    <Box className="container-imagen">
      {selectorImagen(imagen)}
      {children}
    </Box>
  );
}

export default ContainerImagen;
