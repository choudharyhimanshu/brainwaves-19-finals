import React, { Component } from 'react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from "./components/Header";
import {HashRouter, Route} from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Search from "./components/Search";
import {ToastContainer} from "react-toastify";

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Header/>
          <ToastContainer />
          <Route exact path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/search" component={Search} />
        </HashRouter>
      </>
    );
  }
}

export default App;
