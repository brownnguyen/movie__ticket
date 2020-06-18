import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import HomeTemplate from './Templates/HomeTemplate';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import UserTemplate from './Templates/UserTemplate';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HomeTemplate path="/home" exact component={Home} />
        <HomeTemplate path="/chitietphim/:movieId" exact component={MovieDetail} />
        <UserTemplate path="/login" exact component={Login} />
        <UserTemplate path="/register" exact component={Register}/>
        <HomeTemplate path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
