// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyCzoFr9eklXOmJIrr9hIKkC0Brw8dGU0uY",
  authDomain: "borra-vino-social-club-app.firebaseapp.com",
  projectId: "borra-vino-social-club-app",
  storageBucket: "borra-vino-social-club-app.appspot.com",
  messagingSenderId: "1070482560439",
  appId: "1:1070482560439:web:ae6c00668609d0885a8432"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);

// export const db = firebaseApp.firestore()
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
