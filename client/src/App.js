import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateActivity from './components/CreateActivity';
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={ LandingPage } />
        <Route path='/home' component={ Home } />
        <Route path='/activities' component={ CreateActivity } />
        <Route path='/detail/:id' component={ Detail } />
      </div>
    </BrowserRouter>
  );
}

export default App;
