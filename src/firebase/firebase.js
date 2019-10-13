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
        .then(result => {
          let formId = result.key;
          console.log(formId);
          return this.db.ref('/owners/').push({
            formId: formId
          })
        });
    }

    getSyncFormFromDatabase = formId => {
      return this.db.ref('/forms/' + formId).once('value');
    }

    getOverviewInformation = ownerId => {
      return this.db.ref('/owners/' + ownerId).once('value')
        .then((result) => {
          console.log(result.val());
          if (result.val() != null) {
            let formId = result.val().formId;
            return this.db.ref('/forms/' + formId).once('value');
          }        
        });
    }
    
    setFirebaseForm = (formId, time) => {
      return this.db.ref('/forms/' + formId + '/times/').push({
        time
      });
    }

    getTimesForForm = formId => {
      return this.db.ref('forms/' + formId + '/times').once('value');  
    }
}

const firebase = new Firebase();
export default firebase;

