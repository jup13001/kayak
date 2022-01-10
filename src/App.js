
import './App.css';
import Airlines from '../src/features/airlines/airlines.js';
import Landing from './features/landing/landing.js';
import logo from './Logo.svg'
function App() {
  return (
    <div className="App">
      <div class="logo"><img src={logo} /></div>
       <Landing />
    </div>
  );
}

export default App;
