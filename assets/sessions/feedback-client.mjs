import {initializeApp} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import {getAuth, setPersistence, browserLocalPersistence, inMemoryPersistence, signInAnonymously}
  from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import {getFirestore, doc, collection, getDoc, getDocs, query, where, setDoc, serverTimestamp, onSnapshot}
  from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';
import {createFeedbackService} from './feedback-service.mjs';
import {loadPublicFirebaseConfig} from './firebase-config.mjs';

let connection;
export function connectFeedback(config) {
  if (!connection) {
    connection = loadPublicFirebaseConfig(config.firebaseConfigUrl, config.firebaseProjectId).then(firebase =>
      createFeedbackService({initializeApp, getAuth, setPersistence, browserLocalPersistence,
      inMemoryPersistence, signInAnonymously, getFirestore, doc, collection, getDoc, getDocs,
      query, where, setDoc, serverTimestamp, onSnapshot}, {
        ...config,
        firebase,
        sessionIds: [...document.querySelectorAll('[data-session-feedback]')].map(panel => panel.dataset.sessionId),
      })).catch(error => {
      connection = null;
      throw error;
    });
  }
  return connection;
}
