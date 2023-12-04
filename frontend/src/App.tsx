import { useState } from "react";
import './App.css';
import PersistentDrawerLeft from './components/drawer/drawer';
import MapView from './components/main_page/map';
import mapPositionContext from "./utils/mapcontext";


function App() {
  const [position, setPosition] = useState([50.86079, 17.4674])

  return (
    <mapPositionContext.Provider value={ { position, setPosition }}>
    <div className="App">
      <PersistentDrawerLeft />
      <div className="map-slot">
      <MapView />
      </div>
    </div>
    </mapPositionContext.Provider>
  );
}

export default App;
