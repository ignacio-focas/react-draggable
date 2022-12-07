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
  const [dummyValues, setDummyValues] = useState({
    Producto: "ACTRON RAP ACC cap x20 AR/UR",
    Lote: "ARE495",
    HoraDeInicio: "14/03/2014 11:23:19",
    MinutosEnMarcha: 186,
    EstucheMin: 0,
    EstuchesConsumidos: 54395,
    EstuchesProducidos: 54000,
    CantDeBultos: 669,
    CantDePaletas: 5,
  });

  useEffect(() => {
    const existingButtonPositions = JSON.parse(
      localStorage.getItem("positions_button")
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
    localStorage.setItem("positions_button", JSON.stringify(positions));
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
      >
        {items.map((item) => {
          return (
            <Draggable
              disabled={disableDrag}
              key={item.id}
              defaultPosition={
                positions === null
                  ? { x: 0, y: 0 }
                  : !positions[item.id]
                  ? { x: 0, y: 0 }
                  : { x: positions[item.id].x, y: positions[item.id].y }
              }
              onStop={handleStop}
              bounds="parent"
            >
              <Button id={item.id} className="itemDrag">
                {item.title}
              </Button>
            </Draggable>
          );
        })}
      </ContainerImagen>
      <div className="container-valores">
        <div>
          <Draggable>
            <Input
              label="Producto"
              readOnly
              defaultValue={dummyValues.Producto}
            />
          </Draggable>
          <Draggable>
            <Input label="Lote" readOnly defaultValue={dummyValues.Lote} />
          </Draggable>

          <Draggable>
            <Input
              label="Hora de Inicio"
              readOnly
              defaultValue={dummyValues.HoraDeInicio}
            />
          </Draggable>
          <Draggable>
            <Input
              label="Minutos en Marcha"
              readOnly
              defaultValue={dummyValues.MinutosEnMarcha}
            />
          </Draggable>

          <Draggable>
            <Input
              label="Estuche/min"
              readOnly
              defaultValue={dummyValues.EstucheMin}
            />
          </Draggable>
        </div>
        <div>
          <Draggable>
            <Input
              label="Estuches consumidos"
              readOnly
              defaultValue={dummyValues.EstuchesConsumidos}
            />
          </Draggable>
          <Draggable>
            <Input
              label="Estuches producidos"
              readOnly
              defaultValue={dummyValues.EstuchesProducidos}
            />
          </Draggable>
          <Draggable>
            <Input
              label="Cant. de Bultos"
              readOnly
              defaultValue={dummyValues.CantDeBultos}
            />
          </Draggable>
          <Draggable>
            <Input
              label="Cant. de Paletas"
              readOnly
              defaultValue={dummyValues.CantDePaletas}
            />
          </Draggable>
        </div>
      </div>
    </>
  ) : null;
}

export default App;
