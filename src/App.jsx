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
  const [verSelectorImagenes, setVerSelectorImagenes] = useState(false);
  const [imagen, setImagen] = useState("");
  const [color, setColor] = useState("grey");
  const [dummyValues, setDummyValues] = useState([
    { Value: "ACTRON RAP ACC cap x20 AR/UR", Label: "Producto", id: 1 },
    { Value: "ARE495", Label: "Lote", id: 2 },
    { Value: "14/03/2014 11:23:19", Label: "Hora de inicio", id: 3 },
    { Value: 186, Label: "Minutos en marcha", id: 4 },
    { Value: 0, Label: "Estuche/min", id: 5 },
    { Value: 54395, Label: "Estuches consumidos", id: 6 },
    { Value: 54000, Label: "Estuches producidos", id: 7 },
    { Value: 669, Label: "Cantidad de bultos", id: 8 },
    { Value: 5, Label: "Cantidad de paletas", id: 9 },
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
      setVerSelectorImagenes(true);
    } else {
      setDisableDrag(true);
      setColor("grey");
      setVerSelectorImagenes(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("positions", JSON.stringify(positions));
  }, [positions]);

  return hasLoaded ? (
    <>
      <MenuEdicion
        handleEdicion={() => toggleModoEdicion()}
        handleClickImagen={(img) => setImagen(img)}
        verSelectorImagenes={verSelectorImagenes}
        color={color}
      />

      <ContainerImagen
        imagen={imagen}
        hasLoaded={hasLoaded}
        setImagen={(img) => setImagen(img)}
        setHasLoaded={() => setHasLoaded}
      ></ContainerImagen>
      <div className="container-valores">
        {dummyValues.map((dummy) => {
          return (
            <Draggable
              disabled={disableDrag}
              key={dummy.id}
              onStop={handleStop}
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
          );
        })}
      </div>
    </>
  ) : null;
}

export default App;
