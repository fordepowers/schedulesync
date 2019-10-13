import React from 'react';
import './UserForm.css';
import firebase from '../firebase/firebase';

export default class UserForm extends React.Component {

  componentDidMount() {
    const { formId } = this.props.match.params;

    firebase.getSyncFormFromDatabase(formId)
      .then((result) => {
        console.log(result.val());
        this.setState({
          ...result.val()
        });
      });


  }
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return <h1>{this.state.title}</h1>
  }
}
