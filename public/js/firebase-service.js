/**
 * Capa de Datos Unificada Firebase v10 (Firestore + Auth + Messaging)
 * Conecta automáticamente public/index.html (Solo Lectura/Suscripción)
 * y public/admin.html (Lectura/Escritura protegida).
 */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Reemplaza con las credenciales de tu proyecto en Firebase Console:
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCx-QiX-KphBzUytNjR6szmjZUt7NZEWuw",
  authDomain: "app-fut-ee0b6.firebaseapp.com",
  projectId: "app-fut-ee0b6",
  storageBucket: "app-fut-ee0b6.firebasestorage.app",
  messagingSenderId: "182018476340",
  appId: "1:182018476340:web:921a392788440022c9bd61"
};

let db = null;
let auth = null;

export function initFirebaseLeague(customConfig = null) {
  const cfg = customConfig || FIREBASE_CONFIG;
  if (!cfg || cfg.apiKey === "REEMPLAZAR_CON_TU_API_KEY") {
    console.info("Modo Local Activo: Configura FIREBASE_CONFIG en public/js/firebase-service.js para sincronizar con Firestore.");
    return { connected: false };
  }
  const app = initializeApp(cfg);
  db = getFirestore(app);
  auth = getAuth(app);
  return { connected: true, db, auth };
}

export function subscribeToLeagueState(leagueId = 'default', callback) {
  if (!db) return null;
  const ref = doc(db, 'leagues', leagueId);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
}

export async function pushLeagueStateToFirestore(leagueId = 'default', stateData) {
  if (!db) return false;
  const ref = doc(db, 'leagues', leagueId);
  await setDoc(ref, {
    ...stateData,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  return true;
}

export { signInWithEmailAndPassword, signOut, onAuthStateChanged };
