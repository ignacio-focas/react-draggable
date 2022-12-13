import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import Draggable from "react-draggable";
import { Input } from "semantic-ui-react";
import ContainerImagen from "./components/ContainerImagen";
import MenuEdicionTop from "./components/MenuEdicionTop";
import MenuEdicionSide from "./components/MenuEdicionSide";
import Baliza from "./components/Baliza";

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
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
    {
      Value: "ARE495",
      Label: "Lote",
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
    {
      Value: "14/03/2014 11:23:19",
      Label: "Hora de inicio",
      id: uuid(),

      mostrar: false,
      tipo: "input",
    },
    {
      Value: 186,
      Label: "Minutos en marcha",
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
    {
      Value: 0,
      Label: "Estuche/min",
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
    {
      Value: 54395,
      Label: "Estuches consumidos",
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
    {
      Value: 54000,
      Label: "Estuches producidos",
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
    {
      Value: 669,
      Label: "Cantidad de bultos",
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
    {
      Value: 5,
      Label: "Cantidad de paletas",
      id: uuid(),
      mostrar: false,
      tipo: "input",
    },
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

  function agregarBaliza(forma) {
    const balizaDefault = {
      color: "red",
      forma: forma,
      tipo: "baliza",
      id: uuid(),
    };
    setItemsVisibles(itemsVisibles.concat(balizaDefault));
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
        <MenuEdicionSide
          modoEdicion={modoEdicion}
          values={dummyValues}
          handleMostrar={(id) => toggleMostrar(id)}
          agregarBaliza={(forma) => agregarBaliza(forma)}
        />
        <ContainerImagen
          imagen={imagen}
          hasLoaded={hasLoaded}
          setImagen={(img) => setImagen(img)}
          setHasLoaded={() => setHasLoaded}
        >
          {itemsVisibles.map((dummy) => {
            if (dummy.tipo === "baliza") {
              return (
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
                  <div style={{ position: "absolute" }}>
                    <Baliza color={dummy.color} forma={dummy.forma} />
                  </div>
                </Draggable>
              );
            } else if (dummy.tipo === "input") {
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
            }
            return null;
          })}
        </ContainerImagen>
      </div>
    </>
  ) : null;
}

export default App;
