import { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { Input } from "semantic-ui-react";
import ContainerImagen from "./components/ContainerImagen";
import MenuEdicionTop from "./components/MenuEdicionTop";
import MenuEdicionBottom from "./components/MenuEdicionBottom";

function App() {
  const [positions, setPositions] = useState({});
  const [itemsVisibles, setItemsVisibles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [disableDrag, setDisableDrag] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [imagen, setImagen] = useState("");
  const [dummyValues, setDummyValues] = useState([
    {
      Value: "ACTRON RAP ACC cap x20 AR/UR",
      Label: "Producto",
      id: 1,
      mostrar: false,
    },
    { Value: "ARE495", Label: "Lote", id: 2, mostrar: false },
    {
      Value: "14/03/2014 11:23:19",
      Label: "Hora de inicio",
      id: 3,
      mostrar: false,
    },
    { Value: 186, Label: "Minutos en marcha", id: 4, mostrar: false },
    { Value: 0, Label: "Estuche/min", id: 5, mostrar: false },
    { Value: 54395, Label: "Estuches consumidos", id: 6, mostrar: false },
    { Value: 54000, Label: "Estuches producidos", id: 7, mostrar: false },
    { Value: 669, Label: "Cantidad de bultos", id: 8, mostrar: false },
    { Value: 5, Label: "Cantidad de paletas", id: 9, mostrar: false },
  ]);

  useEffect(() => {
    const existingButtonPositions = JSON.parse(
      localStorage.getItem("positions")
    );
    const existingVisibles = JSON.parse(localStorage.getItem("visibles"));
    setPositions(existingButtonPositions);
    setItemsVisibles(existingVisibles);
    setHasLoaded(true);
  }, []);

  function handleStop(e, data) {
    let dummyPositions = { ...positions };
    const itemId = e.target.id;
    dummyPositions[itemId] = {};
    dummyPositions[itemId]["x"] = data.x;
    dummyPositions[itemId]["y"] = data.y;
    setPositions(dummyPositions);
  }

  function toggleModoEdicion() {
    if (!modoEdicion) {
      setDisableDrag(false);
      setModoEdicion(true);
    } else {
      setDisableDrag(true);
      setModoEdicion(false);
    }
  }

  const toggleMostrar = (id) => {
    const dummy = dummyValues.find((d) => d.id === id);
    const dummyModificado = { ...dummy, mostrar: true };
    const newValues = dummyValues.filter((d) => d.id !== id);
    setItemsVisibles(itemsVisibles.concat(dummyModificado));
    setDummyValues([...newValues, dummyModificado]);
  };

  useEffect(() => {
    localStorage.setItem("positions", JSON.stringify(positions));
    localStorage.setItem("visibles", JSON.stringify(itemsVisibles));
  }, [positions, itemsVisibles]);

  return hasLoaded ? (
    <>
      <MenuEdicionTop
        handleEdicion={() => toggleModoEdicion()}
        handleClickImagen={(img) => setImagen(img)}
        verSelectorImagenes={modoEdicion}
        modoEdicion={modoEdicion}
      />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <ContainerImagen
          imagen={imagen}
          hasLoaded={hasLoaded}
          setImagen={(img) => setImagen(img)}
          setHasLoaded={() => setHasLoaded}
        >
          {itemsVisibles.map((dummy) => {
            return (
              dummy.mostrar && (
                <Draggable
                  disabled={disableDrag}
                  key={dummy.id}
                  onStop={handleStop}
                  bounds="parent"
                  defaultPosition={
                    positions === null
                      ? { x: 0, y: 0 }
                      : !positions[dummy.id]
                      ? { x: 0, y: 0 }
                      : { x: positions[dummy.id].x, y: positions[dummy.id].y }
                  }
                >
                  <Input
                    id={dummy.id}
                    label={dummy.Label}
                    readOnly
                    defaultValue={dummy.Value}
                  />
                </Draggable>
              )
            );
          })}
        </ContainerImagen>
        <MenuEdicionBottom
          modoEdicion={modoEdicion}
          values={dummyValues}
          handleMostrar={(id) => toggleMostrar(id)}
        />
      </div>
    </>
  ) : null;
}

export default App;
