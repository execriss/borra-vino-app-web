import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import icon from "../assets/images/cargarUser.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import firebaseApp from "../firebase/credenciales"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from 'firebase/firestore'

export default function AddUser({imagen, title, description, buttonTitle}) {
  const [open, setOpen] = React.useState(false);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const [msgerror, setMsgerror] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const registrarUsuario = async (name, email, password, role) => {
    setLoading(true)
    const infoUsuarios = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    .then((usuarioFirebase) => {
      setLoading(false)
      return usuarioFirebase;
    })
    .catch((err) => {
      setLoading(false)
      console.log('error add user', err);
      if (err.code === 'auth/email-already-in-use') {
        setMsgerror('Este Email ya está en uso.')
      }
      if (err.code === 'auth/weak-password') {
        setMsgerror('La contraseña debe tener como mínimo 6 caracteres.')
      }
    })
    const docRef = doc(firestore, `usuarios/${infoUsuarios.user.uid}`);
    setDoc(docRef, { name: name, correo: email, role: role });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    registrarUsuario(name, email, password, role)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ maxWidth: 345, background: '#F4DECB', minHeight: 140, borderRadius: '20px'}}>
      <CardActionArea onClick={() => handleClickOpen()}>
        <Typography variant="h5" component="div" sx={{ marginTop: '20px', color:'#49274A', fontFamily: 'sans-serif', fontWeight: 'bold', textAlign: 'center'}}>
          Agregar Usuario
        </Typography>
        <CardMedia
          component="img"
          height="220"
          image={icon}
          alt="Agregar usuario"
        />
      </CardActionArea>
      <CardActions>
              <Dialog open={open} onClose={handleClose} style={{ background: "#94618E50" }} fullWidth>
                <DialogTitle color={"#F8EEE7"} bgcolor={"#98618E"}>NUEVO USUARIO</DialogTitle>
                <DialogContent> 
                <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center pt-4">
                    <div className="col-md-12 mb-3">
                        <input type="text" required placeholder="Nombre de Usuario" className="form-control" id='name'></input>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="email" required placeholder="Email Nuevo Usuario" className="form-control" id='email'></input>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="password" required placeholder="Contraseña Nuevo Usuario" className="form-control" id='password'></input>
                    </div>
                    <select className="form-select mb-4" id="role" placeholder='Rol'>
                      <option value="admin">Administrador</option>
                      <option selected value="user">Usuario</option>
                    </select>
                    {
                      msgerror !== null ?
                        (
                          <div className='alert alert-danger'>
                            {msgerror}
                          </div>
                        )
                        :
                        (
                          <span></span>
                        )
                    }
                  <div className='d-flex flex-row justify-content-between mt-3'>
                      <button type="button" className="btn btn-outline-danger mb-2 d-flex flex-end" onClick={() => handleClose()}>Cancelar</button>
                      <button type="submit" className="btn btn-outline-success mb-2 d-flex flex-end">
                        {
                          loading ? 
                            <div class="spinner-border" role="status">
                              <span class="visually-hidden">Cargando...</span>
                            </div> 
                          : <p>Crear Usuario</p>
                        }
                      </button>
                    </div>
                <DialogActions>
                </DialogActions>
                </form>  
                </DialogContent>
              </Dialog>
      </CardActions>
    </Card>
  );
}
