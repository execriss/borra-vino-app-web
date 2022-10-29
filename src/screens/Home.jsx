import React from "react";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

const auth = getAuth(firebaseApp);

const Home = ({ user }) => {
  let navigate = useNavigate();
  const [checkeedPuntos, setCheckedPuntos] = React.useState();
  const [checkeedMuestras, setCheckedMuestras] = React.useState();
  
  const firestore = getFirestore(firebaseApp);
  const db = getFirestore(firebaseApp);

  async function getDataMuestras(db) {
    const eventCol = collection(db, 'habilitarMuestras');
    const eventSnapshot = await getDocs(eventCol);
    const eventList = eventSnapshot.docs.map(doc => doc.data());
    return eventList;
  }

  async function getDataPuntos(db) {
    const eventCol = collection(db, 'habilitarPuntos');
    const eventSnapshot = await getDocs(eventCol);
    const eventList = eventSnapshot.docs.map(doc => doc.data());
    return eventList;
  }

  React.useEffect(() => {
    getDataMuestras(db).then(res => {
      setCheckedMuestras(res[0]?.active)
    });

    getDataPuntos(db).then(res => {
      setCheckedPuntos(res[0]?.active)
    });
  }, [db])

  React.useEffect(() => {
    const updateCheckedMuestras = async () => {
      const docRef = doc(firestore, `habilitarMuestras/muestras`);
      if (true) {
        setDoc(docRef, { active: checkeedMuestras })
        .then((res) => {
        })
        .catch((err) => {
          console.log('ERROR get muestras', err)
        })
      }
    };

    updateCheckedMuestras();
  }, [checkeedMuestras, db, firestore])

  React.useEffect(() => {
    const updateCheckedPuntos = async () => {
      const docRef = doc(firestore, `habilitarPuntos/puntos`);
      if (true) {
        setDoc(docRef, { active: checkeedPuntos })
        .then((res) => {
        })
        .catch((err) => {
          console.log('ERROR get puntos', err)
        })
      }
    };

    updateCheckedPuntos();
  }, [checkeedPuntos, db, firestore])

  const checkedPuntos = () => {
    setCheckedPuntos(!checkeedPuntos)
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  const checkedMuestras = () => {
    setCheckedMuestras(!checkeedMuestras)
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  const logout = (auth) => {
    signOut(auth)
    navigate('/')
  }

  const renderCards = () => {
    if (user?.rol === "admin") {
      return (
      <>
        <div className="d-flex flex-row mb-4">
          <div className="form-check form-switch" style={{ marginTop: '4em' , marginLeft: '1em', paddingTop: '1em'}}>
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault1" checked={checkeedPuntos} onChange={() => checkedPuntos()}/>
            <label className="form-check-label mt-1" for="flexSwitchCheckDefault" style={{ color: 'white', fontFamily: 'sans-serif' }}>Habilitar Puntuación</label>
          </div>
          <div className="form-check form-switch" style={{ marginTop: '4em' , marginLeft: '1em', paddingTop: '1em'}}>
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault2" checked={checkeedMuestras} onChange={() => checkedMuestras()}/>
            <label className="form-check-label mt-1" for="flexSwitchCheckDefault" style={{ color: 'white', fontFamily: 'sans-serif' }}>Habilitar Muestras</label>
          </div>
        </div>
        <AdminView user={user}/>
      </>
      )
    } else if (user?.rol === "user") {
      return (
        <div>
          <UserView user={user}/>
        </div>
      )
    } 
    return (
      <LoadingPage />
    )
  }

  return (
      <div style={{ background: '#94618E', minHeight: 'auto', paddingBottom: '80px'}}>
        <nav className="navbar navbar-dark fixed-top" style={{ background: '#49274A'}}>
          <div className="container-fluid">
            <p className="navbar-brand" style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
              Bienvenido {user?.nombre ?? 
              <div className="spinner-border ms-3" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>}
            </p>
            <button
              onClick={() => logout(auth)}
              className="btn btn-outline-light me-2"
              style={{ fontFamily: 'sans-serif'}}
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
        {/* <div> */}
          {/* {
          user?.rol === "admin" ? 
            <div className="d-flex flex-row mb-4">
              <div className="form-check form-switch" style={{ marginTop: '4em' , marginLeft: '1em', paddingTop: '1em'}}>
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault1" checked={checkeedPuntos} onChange={() => checkedPuntos()}/>
                <label className="form-check-label mt-1" for="flexSwitchCheckDefault" style={{ color: 'white', fontFamily: 'sans-serif' }}>Habilitar Puntuación</label>
              </div>
              <div className="form-check form-switch" style={{ marginTop: '4em' , marginLeft: '1em', paddingTop: '1em'}}>
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault2" checked={checkeedMuestras} onChange={() => checkedMuestras()}/>
                <label className="form-check-label mt-1" for="flexSwitchCheckDefault" style={{ color: 'white', fontFamily: 'sans-serif' }}>Habilitar Muestras</label>
              </div>
            </div>
          :
            null
        }
        </div>
        {user?.rol === "admin" ? <AdminView user={user}/> : <UserView user={user}/>} */}
        {renderCards()}
      </div>
  );
};

export default Home;
