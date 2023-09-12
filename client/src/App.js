import './App.css';
import { BrowserRouter , Route , Switch} from "react-router-dom";
import LandingPage from './pages/landing/LandingPage.jsx';
import Home from "./pages/home/Home.jsx"
import Form from "./pages/form/Form.jsx"
import Detail from "./pages/detail/Detail.jsx"
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001";


function App() {
  return (
    <BrowserRouter>
      <div className="app"> 
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/home" component={Home} ></Route>
        <Route path="/create" component={Form}></Route>
        <Route path="/pokemons/:id" component={Detail} ></Route>
      </Switch >
      </div>
    </BrowserRouter>
  );
}

export default App;

