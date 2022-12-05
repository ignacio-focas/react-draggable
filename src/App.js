import { useState, useEffect } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import { Button, Menu } from 'semantic-ui-react';


function App() {

  const items= ["item 1", "item 2", "item 3", "item 4"];
  const [positions, setPositions] = useState({})
  const [hasLoaded, setHasLoaded] = useState(false)
  const [disableDrag, setDisableDrag] = useState(true)

  useEffect(()=>{
    const existingButtonPositions = JSON.parse(localStorage.getItem('positions_button'))
    setPositions(existingButtonPositions);
    setHasLoaded(true);
  },[])

  function handleStop(e, data){
    let dummyPositions = {...positions}
    const itemId = e.target.id
    dummyPositions[itemId] = {}
    dummyPositions[itemId]["x"] = data.x
    dummyPositions[itemId]["y"] = data.y
    setPositions(dummyPositions)
  }

  useEffect(()=>{
    localStorage.setItem('positions_button', JSON.stringify(positions))
  },[positions])

  return (

    hasLoaded ? (
      <>
      <Menu>
       <Menu.Item>
        <Button.Group>
          <Button onClick={()=>{setDisableDrag(false)}}>Editar</Button>
          <Button.Or />
          <Button onClick={()=>{setDisableDrag(true)}}>Ver</Button>
        </Button.Group>
       </Menu.Item>
      </Menu>
      
      <div className='itemsContainer'>
          {items.map((item)=>{
            return(
              <Draggable disabled={disableDrag} key={item[5]} defaultPosition={
                positions === null ? 
                {x:0, y:0} 
                : !positions[item[5]] ? 
                {x: 0, y: 0} 
                :{x:positions[item[5]].x, y: positions[item[5]].y} 
                }
                onStop={handleStop}
                bounds='parent'>
              
                <Button id={item[5]} className='itemDrag' >{item}</Button>
                
              </Draggable>
            )
          })}
      </div>
      </>
    ) : null
  );
}

export default App;
