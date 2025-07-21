// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// 🔁 Copia esto desde la consola de Firebase > Configuración del proyecto > Configuración general
const firebaseConfig = {
  apiKey: "AIzaSyAeKXv48PsqCtbydrzaS5wg2Lh2jpH2ddg",
  authDomain: "contact-form-ebf7e.firebaseapp.com",
  projectId: "contact-form-ebf7e",
  storageBucket: "contact-form-ebf7e.firebasestorage.app",
  messagingSenderId: "34765395820",
  appId: "1:34765395820:web:439623bb624c7229d08549"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

