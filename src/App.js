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
import SyncOverview from './SyncOverview/SyncOverview';
import UserForm from './UserForm/UserForm';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    // const overviewPage = 'overview';
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
          
          <Route path="/overview/:ownerId" component={SyncOverview} />

          <Route path="/user-form/:formId" component={UserForm}/>
          
        </Switch>
      </Router>
    );
  }
}

export default App;
