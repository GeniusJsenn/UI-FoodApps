import './App.css';
import FoodSelectionsComponent from './components/FoodSelectionsComponent';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';


function App() {
  return (
    <div>
      <Router>
        <h1>Food Random Generate</h1>
        <Routes>
          <Route path = "/" exact={true} element = {<FoodSelectionsComponent/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
