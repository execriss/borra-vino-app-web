import React from 'react'
import firebaseApp from "../firebase/credenciales"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  const registrarUsuario = async (email, password, role) => {
    const infoUsuarios = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    const docRef = doc(firestore, `usuarios/${infoUsuarios.user.uid}`);
    setDoc(docRef, { correo: email, role: role });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    registrarUsuario(email, password, role);
    
  }

  return (
    <div className='container form-group'>
      <h3 className='h3 text-center mt-2'>Registrar Usuario</h3>
      <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center">
        <label className='mt-5'>Correo Electrónico
          <input type="email" id='email'className='form-control'/>
        </label>
        <label className='mt-4'>Contraseña
          <input type="password" id='password' className='form-control'/>
        </label>
        <label className='mt-4'>
          Rol:
          <select id='role'>
            <option value="admin" className='form-check-input'>Administrador</option>
            <option value="user" className='form-check-input'>Usuario</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary mt-4">Registrar</button>
      </form>  
    </div>
  )
};

export default Register;
