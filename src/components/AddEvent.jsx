import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import icon from "../assets/images/eventoCata.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import firebaseApp from '../firebase/credenciales';
import { DatePicker } from '@material-ui/pickers'
import { getFirestore, doc, setDoc } from 'firebase/firestore'


export default function AddEvent({imagen, title, description, buttonTitle}) {
  const [open, setOpen] = React.useState(false);
  const [selectDate, setSelectDate] = React.useState()
  const firestore = getFirestore(firebaseApp);
  const [msgerror, setMsgerror] = React.useState(null)
  const [loading, setLoading] = React.useState(false)


  const [datos, setDatos] = React.useState({
    dateEvent: 0,
    eventNumber: 0,
    numberOfSample: 0,
    sampleOne: '',
    sampleTwo: '',
    sampleThree: '',
    sampleFour: '',
    sampleFive: '',
    sampleSix: '',
    bodegaUno: '',
    origenUno: '',
    precioUno: '',
    bodegaDos: '',
    origenDos: '',
    precioDos: '',
    bodegaTres: '',
    origenTres: '',
    precioTres: '',
    bodegaCuatro: '',
    origenCuatro: '',
    precioCuatro: '',
    bodegaCinco: '',
    origenCinco: '',
    precioCinco: '',
    bodegaSeis: '',
    origenSeis: '',
    precioSeis: '',
})

const registrarEvento = async (email, password, role) => {
  setLoading(true)
  const docRef = doc(firestore, `eventos/${datos.eventNumber}`);
  setDoc(docRef, { datos })
  .then((res) => {
    setLoading(false);
    alert('¡Evento creado correctamente!')
    setOpen(false);
    window.location.reload()
  })
  .catch((err) => {
    setMsgerror(`LO SENTIMOS, HUBO UN ERROR. -${err.code}`)
    console.log('error add event', err);
  })
};

const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value,
        dateEvent: selectDate.toLocaleDateString()
    })
}

const enviarDatos = (event) => {
    setLoading(true);
    event.preventDefault()
    if (selectDate === undefined) {
      setMsgerror('Debes seleccionar una fecha')
    }
    registrarEvento()
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
            Agregar Evento
          </Typography>
        <CardMedia
          component="img"
          height="220"
          image={icon}
          alt="Agregar Evento"
        />
      </CardActionArea>
      <CardActions>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle color={"#F8EEE7"} bgcolor={"#98618E"}>Nuevo Evento</DialogTitle>
          <div className='container px-5 pt-3'>
                  <form className="column" onSubmit={enviarDatos} >
                    <label htmlFor="">Fecha del evento</label>
                    <div className='mb-3'>
                      <DatePicker value={selectDate} onChange={setSelectDate} required/>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="number" required placeholder="Degustación N°" className="form-control" onChange={handleInputChange} name="eventNumber"></input>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="number" required placeholder="Cantidad de muestras a catar" className="form-control" onChange={handleInputChange} name="numberOfSample"></input>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" placeholder="Nombre/Marca Muestra 1" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleOne"></input>
                        <div className='d-flex flex-row mt-1'>
                          <input type="text" placeholder="Bodega" className="form-control" onChange={handleInputChange} name="bodegaUno"></input>
                          <input type="text" placeholder="Origen" className="form-control" onChange={handleInputChange} name="origenUno"></input>
                          <input type="text" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precioUno"></input>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" placeholder="Nombre/Marca Muestra 2" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleTwo"></input>
                        <div className='d-flex flex-row mt-1'>
                          <input type="text" placeholder="Bodega" className="form-control" onChange={handleInputChange} name="bodegaDos"></input>
                          <input type="text" placeholder="Origen" className="form-control" onChange={handleInputChange} name="origenDos"></input>
                          <input type="text" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precioDos"></input>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" placeholder="Nombre/Marca Muestra 3" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleThree"></input>
                        <div className='d-flex flex-row mt-1'>
                          <input type="text" placeholder="Bodega" className="form-control" onChange={handleInputChange} name="bodegaTres"></input>
                          <input type="text" placeholder="Origen" className="form-control" onChange={handleInputChange} name="origenTres"></input>
                          <input type="text" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precioTres"></input>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" placeholder="Nombre/Marca Muestra 4" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleFour"></input>
                        <div className='d-flex flex-row mt-1'>
                          <input type="text" placeholder="Bodega" className="form-control" onChange={handleInputChange} name="bodegaCuatro"></input>
                          <input type="text" placeholder="Origen" className="form-control" onChange={handleInputChange} name="origenCuatro"></input>
                          <input type="text" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precioCuatro"></input>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" placeholder="Nombre/Marca Muestra 5" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleFive"></input>
                        <div className='d-flex flex-row mt-1'>
                          <input type="text" placeholder="Bodega" className="form-control" onChange={handleInputChange} name="bodegaCinco"></input>
                          <input type="text" placeholder="Origen" className="form-control" onChange={handleInputChange} name="origenCinco"></input>
                          <input type="text" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precioCinco"></input>
                        </div>
                    </div>
                    <div className="col-md-12 mb-4">
                        <input type="text" placeholder="Nombre/Marca Muestra 6" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleSix"></input>
                        <div className='d-flex flex-row mt-1'>
                          <input type="text" placeholder="Bodega" className="form-control" onChange={handleInputChange} name="bodegaSeis"></input>
                          <input type="text" placeholder="Origen" className="form-control" onChange={handleInputChange} name="origenSeis"></input>
                          <input type="text" placeholder="Precio" className="form-control" onChange={handleInputChange} name="precioSeis"></input>
                        </div>
                    </div>
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
                    
                    <div className='d-flex flex-row justify-content-between'>
                      <button type='button' className="btn btn-outline-danger mb-2 d-flex flex-end" onClick={handleClose}>Cancelar</button>
                      <button type="submit" className="btn btn-outline-success mb-2 d-flex flex-end">
                        {
                          loading ? 
                          <div class="spinner-border" role="status">
                            <span class="visually-hidden">Cargando...</span>
                          </div>  
                          : 
                          <p>Crear Evento</p>
                        }
                      </button>
                    </div>
                </form>
                  
                </div>
                <DialogActions>
                </DialogActions>
              </Dialog>
        </CardActions>
    </Card>
  );
}
