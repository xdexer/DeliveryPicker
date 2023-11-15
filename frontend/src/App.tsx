import './App.css';
import PersistentDrawerLeft from './components/drawer/drawer';
import MapView from './components/main_page/map';

function App() {
  return (
    <div className="App">
      <PersistentDrawerLeft />
      <div className="map-slot">
      <MapView />
      </div>
    </div>
  );
}

export default App;
