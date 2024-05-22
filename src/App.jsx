import './App.css';
import Header from './components/Header/Header.jsx';
import Mainboard from './components/Mainboard.jsx';

function App() {
  return (
    <div className="flex flex-col">
      <Header></Header>
      <Mainboard className="flex-1"></Mainboard>
    </div>
  );
}

export default App;
