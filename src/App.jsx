import React, { useState } from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data()?.role;
    return infoFinal;
  }

  async function getName(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().name;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      getName(usuarioFirebase.uid).then((name) => {
        const userData = {
          uid: usuarioFirebase.uid,
          email: usuarioFirebase.email,
          rol: rol,
          nombre: name
        };
        setUser(userData);
      })
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final
      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  return <>
            {/* {user ? <Home user={user} /> : <Login />} */}
            <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/home" element={<Home user={user}/>}/>
            </Routes>
          </>;
}

export default App;