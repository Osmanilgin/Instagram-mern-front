import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Profile from "./components/Profile";


function App() {

    return (
        <>
      <Router> 
        <Navbar/>

        <Switch> 
          <Route exact path="/">    <HomePage/> </Route>
          <Route   path={"/profile/:username"}>    <Profile/> </Route>
        </Switch>

        </Router>
        </>
    )
}

export default App
