import { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { Button, Input } from "semantic-ui-react";
import ContainerImagen from "./components/ContainerImagen";
import MenuEdicion from "./components/MenuEdicion";

function App() {
  const items = [
    { title: "item 1", id: 1 },
    { title: "item 2", id: 2 },
    { title: "item 3", id: 3 },
    { title: "item 4", id: 4 },
  ];
  const [positions, setPositions] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [disableDrag, setDisableDrag] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [imagen, setImagen] = useState("");
  const [color, setColor] = useState("grey");
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
    setPositions(existingButtonPositions);
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
    if (disableDrag) {
      setDisableDrag(false);
      setColor("teal");
      setModoEdicion(true);
    } else {
      setDisableDrag(true);
      setColor("grey");
      setModoEdicion(false);
    }
  }

  const toggleMostrar = (id) => {
    const dummy = dummyValues.find((d) => d.id === id);
    const dummyModificado = { ...dummy, mostrar: true };
    const newValues = dummyValues.filter((d) => d.id !== id);
    setDummyValues([...newValues, dummyModificado]);
  };

  useEffect(() => {
    localStorage.setItem("positions", JSON.stringify(positions));
  }, [positions]);

  return hasLoaded ? (
    <>
      <MenuEdicion
        handleEdicion={() => toggleModoEdicion()}
        handleClickImagen={(img) => setImagen(img)}
        verSelectorImagenes={modoEdicion}
        color={color}
      />

      <ContainerImagen
        imagen={imagen}
        hasLoaded={hasLoaded}
        setImagen={(img) => setImagen(img)}
        setHasLoaded={() => setHasLoaded}
      >
        {dummyValues.map((dummy) => {
          return (
            dummy.mostrar && (
              <Draggable
                disabled={disableDrag}
                key={dummy.id}
                onStop={handleStop}
                // defaultPosition={
                //   positions === null
                //     ? { x: 0, y: 0 }
                //     : !positions[dummy.id]
                //     ? { x: 0, y: 0 }
                //     : { x: positions[dummy.id].x, y: positions[dummy.id].y }
                // }
                bounds="parent"
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
      {modoEdicion && (
        <div className="container-valores">
          {dummyValues.map((dummy) => {
            return (
              !dummy.mostrar && (
                <Button
                  key={dummy.id}
                  id={dummy.id}
                  content={dummy.Label}
                  color="teal"
                  onClick={() => toggleMostrar(dummy.id)}
                />
              )
            );
          })}
        </div>
      )}
    </>
  ) : null;
}

export default App;
