import React from 'react';
import About from './About/About';
import CreateNewForm from './CreateNewForm/CreateNewForm';
import NavbarCustom from './NavbarCustom/NavbarCustom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <NavbarCustom Text='Create New' Route='/create-new' />
            <About />
          </Route>
          <Route path='/create-new'>
            <NavbarCustom Text='Home' Route='/' />
            <CreateNewForm />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
