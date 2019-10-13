import app from 'firebase/app';
import * as APIKEYS from '../constants/APIKeys';
import 'firebase/database';

const config = {
  apiKey: APIKEYS.apiKey,
  authDomain: APIKEYS.authDomain,
  databaseURL: APIKEYS.databaseURL,
  projectId: APIKEYS.projectId,
  storageBucket: APIKEYS.storageBucket,
  messagingSenderId: APIKEYS.messagingSenderId,
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.database();
  }

    addSyncFormToDatabase = (form) => {
      return this.db.ref('/forms/').push(form)
    }

    getSyncFormFromDatabase = formId => {
      return this.db.ref('/forms/' + formId).once('value');
    }
}

const firebase = new Firebase();
export default firebase;

