import React from 'react';
import About from './About/About';
import CreateNewForm from './CreateNewForm/CreateNewForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import SyncOverview from './SyncOverview/SyncOverview';
import UserForm from './UserForm/UserForm';
import Thanks from './Thanks/Thanks';
import NotFound from './NotFound/NotFound';

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
          <Route exact path='/' component={About} />
          <Route exact path='/create-new' component={CreateNewForm} />
          <Route path='/overview/:ownerId' component={SyncOverview} />
          <Route path='/user-form/:formId' component={UserForm} />
          <Route exact path='/thanks' component={Thanks} />
          <Route path='/' component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
