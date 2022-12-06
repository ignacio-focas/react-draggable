import { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { imagenes } from "./assets/NombresImagenes";
import { Button, Menu } from "semantic-ui-react";
import ContainerImagen from "./components/common/ContainerImagen";

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
  const [imagen, setImagen] = useState("");

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

  useEffect(() => {
    localStorage.setItem("positions_button", JSON.stringify(positions));
  }, [positions]);

  return hasLoaded ? (
    <>
      <Menu>
        <Menu.Item>
          <Button.Group>
            <Button
              onClick={() => {
                setDisableDrag(false);
              }}
            >
              Editar
            </Button>
            <Button.Or />
            <Button
              onClick={() => {
                setDisableDrag(true);
              }}
            >
              Ver
            </Button>
          </Button.Group>
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button onClick={() => setImagen(imagenes.ENVOLVEDORA)}>
              Envolvedora
            </Button>
            <Button onClick={() => setImagen(imagenes.ESTUCHADORA)}>
              Estuchadora
            </Button>
            <Button onClick={() => setImagen(imagenes.COMPRIMIDORA)}>
              Comprimidora
            </Button>
            <Button onClick={() => setImagen(imagenes.ENTUBADORA)}>
              Entubadora
            </Button>
          </Button.Group>
        </Menu.Item>
      </Menu>

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
    </>
  ) : null;
}

export default App;
