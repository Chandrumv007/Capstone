import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AdminCars from './components/AdminCars';
import NavbarForAdmin from './components/NavbarForAdmin';
import {useState } from 'react';
import NavbarForSuperAdmin from './components/NavbarForSuperAdmin';
import SuperAdminCar from './components/SuperAdminCar';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import SearchCarResults from './components/SearchCarResults';

function App(props) {
  const [isUser, setisUser] = useState(true) 
  const [searchCarInfo, setsearchCarInfo] = useState([])
  const [searchError, setsearchError] = useState(false)

  let login = () => {
    setisUser(false)
  }


  if (isUser) {
    return (
      <BrowserRouter>
       <Navbar setisUser={setisUser} isUser={isUser} setsearchCarInfo={setsearchCarInfo} setsearchError={setsearchError} />
        <Switch>
          <Route path="/login">
            <LoginForm  login={login}  />
          </Route>
          <Route path="/signup">
            <SignupForm login={login}  />
          </Route>
          <Route path="/search">
            <SearchCarResults searchcarsinfo={searchCarInfo} searchError={searchError} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </BrowserRouter>
    )
  }
  else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <NavbarForAdmin setisUser={setisUser} />
            <AdminCars />
          </Route>
          <Route path="/superadmin">
            <NavbarForSuperAdmin setisUser={setisUser} />
            <SuperAdminCar />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
