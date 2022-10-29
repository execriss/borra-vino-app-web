import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import icon from "../assets/images/editarEvento.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import firebaseApp from '../firebase/credenciales';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore'


export default function EditEvent({imagen, title, description, buttonTitle}) {
  const db = getFirestore(firebaseApp);
  const [open, setOpen] = React.useState(false);
  const [selectDate, setSelectDate] = React.useState()
  const firestore = getFirestore(firebaseApp);
  const [msgerror, setMsgerror] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState()
  const [fechaFiltrada, setFechaFiltrada] = React.useState()
  const [datos, setDatos] = React.useState()


  async function getData(db) {
    const eventCol = collection(db, 'eventos');
    const eventSnapshot = await getDocs(eventCol);
    const eventList = eventSnapshot.docs.map(doc => doc.data());
    return eventList;
  }

  React.useEffect(() => {
    getData(db).then(res => {
      setData(res.map(item => item.datos))
    })
  }, [db])

  React.useEffect(() => {
    let fecha = [];
    let fechaFiltrada;
    if (data) {
      data?.map((item) => fecha?.push(item?.dateEvent))
      fecha?.sort()
      fechaFiltrada = data?.filter((item) => item?.dateEvent === fecha.at(-1))
      setFechaFiltrada(fechaFiltrada[0])
    }
  }, [data])
  
  React.useEffect(() => {
    setDatos(
      {
        dateEvent: fechaFiltrada?.dateEvent ?? 0,
        eventNumber: fechaFiltrada?.eventNumber ?? 0,
        numberOfSample: fechaFiltrada?.numberOfSample ?? 0,
        sampleOne: fechaFiltrada?.sampleOne ?? '',
        sampleTwo: fechaFiltrada?.sampleTwo ?? '',
        sampleThree: fechaFiltrada?.sampleThree ?? '',
        sampleFour: fechaFiltrada?.sampleFour ?? '',
        sampleFive: fechaFiltrada?.sampleFive ?? '',
        sampleSix: fechaFiltrada?.sampleSix ?? '',
        bodegaUno: fechaFiltrada?.bodegaUno ?? '',
        bodegaDos: fechaFiltrada?.bodegaDos ?? '',
        bodegaTres: fechaFiltrada?.bodegaTres ?? '',
        bodegaCuatro: fechaFiltrada?.bodegaCuatro ?? '',
        bodegaCinco: fechaFiltrada?.bodegaCinco ?? '',
        bodegaSeis: fechaFiltrada?.bodegaSeis ?? '',
        origenUno: fechaFiltrada?.origenUno ?? '',
        origenDos: fechaFiltrada?.origenDos ?? '',
        origenTres: fechaFiltrada?.origenTres ?? '',
        origenCuatro: fechaFiltrada?.origenCuatro ??'',
        origenCinco: fechaFiltrada?.origenCinco ?? '',
        origenSeis: fechaFiltrada?.origenSeis ?? '',
        precioUno: fechaFiltrada?.precioUno ?? '',
        precioDos: fechaFiltrada?.precioDos ?? '',
        precioTres: fechaFiltrada?.precioTres ?? '',
        precioCuatro: fechaFiltrada?.precioCuatro ?? '',
        precioCinco: fechaFiltrada?.precioCinco ?? '',
        precioSeis: fechaFiltrada?.precioSeis ?? '',
        letraMuestra1: fechaFiltrada?.letraMuestra1 ?? '',
        letraMuestra2: fechaFiltrada?.letraMuestra2 ?? '',
        letraMuestra3: fechaFiltrada?.letraMuestra3 ?? '',
        letraMuestra4: fechaFiltrada?.letraMuestra4 ?? '',
        letraMuestra5: fechaFiltrada?.letraMuestra5 ?? '',
        letraMuestra6: fechaFiltrada?.letraMuestra6 ?? '',
    }
    )
  }, [fechaFiltrada])


const registrarEvento = async (email, password, role) => {
  setLoading(true)
  const docRef = doc(firestore, `eventos/${datos.eventNumber}`);
  setDoc(docRef, { datos })
  .then((res) => {
    setLoading(false);
    alert('¡Evento editado correctamente!')
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
    })
}

React.useEffect(() => {
  setDatos({
    ...datos,
    dateEvent: selectDate?.toLocaleDateString()
})
}, [selectDate])


const enviarDatos = (event) => {
    setLoading(true);
    event.preventDefault()
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
            Editar evento
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
        <DialogTitle color={"#F8EEE7"} bgcolor={"#98618E"}>Editar Evento</DialogTitle>
          {
            fechaFiltrada ? 
            <div className='container px-5 pt-3'>
                  <form className="column" onSubmit={enviarDatos} >
                    <div className='d-flex flex-column'>
                      <label htmlFor="" className='mb-3 fw-bold'>Fecha del evento: {fechaFiltrada?.dateEvent}</label>
                      
                      <label htmlFor="" className='mb-5 fw-bold'>Degustación N°: {fechaFiltrada?.eventNumber}</label>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="" className='mb-1'>Cantidad de muestras a catar</label>
                        <input type="number" className="form-control" onChange={handleInputChange} name="numberOfSample" placeholder={fechaFiltrada ? fechaFiltrada?.numberOfSample : "Cantidad de muestras a catar"}></input>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleOne" placeholder={fechaFiltrada ? fechaFiltrada?.sampleOne : "Nombre/Marca Muestra 1"}></input>
                        <div className='d-flex flex-row mt-1'>
                          <div className='d-flex flex-column'>
                            <label style={{fontSize: 12}}>Muestra</label>
                            <input type="text" className="form-control" onChange={handleInputChange} name="letraMuestra1" placeholder={fechaFiltrada?.letraMuestra1 === '' ? 'Muestra' : fechaFiltrada?.letraMuestra1}></input>
                          </div>
                          <div className='d-flex flex-column'>
                            <label style={{fontSize: 12}}>Bodega</label>
                            <input type="text" className="form-control" onChange={handleInputChange} name="bodegaUno" placeholder={fechaFiltrada ? fechaFiltrada?.bodegaUno : 'Bodega'}></input>
                          </div>
                          <div className='d-flex flex-column'>
                            <label style={{fontSize: 12}}>Origen</label>
                            <input type="text" className="form-control" onChange={handleInputChange} name="origenUno" placeholder={fechaFiltrada ? fechaFiltrada?.origenUno : 'Origen'}></input>
                          </div>
                          <div className='d-flex flex-column'>
                            <label style={{fontSize: 12}}>Precio</label>
                            <input type="text" className="form-control" onChange={handleInputChange} name="precioUno" placeholder={fechaFiltrada ? fechaFiltrada?.precioUno : 'Precio'}></input>
                          </div>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleTwo" placeholder={fechaFiltrada ? fechaFiltrada?.sampleTwo : "Nombre/Marca Muestra 2"}></input>
                        <div className='d-flex flex-row mt-1'>
                          <div className='d-flex flex-row mt-1'>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Muestra</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="letraMuestra2" placeholder={fechaFiltrada?.letraMuestra2 === '' ? 'Muestra' : fechaFiltrada?.letraMuestra2}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Bodega</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="bodegaDos" placeholder={fechaFiltrada ? fechaFiltrada?.bodegaDos : 'Bodega'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Origen</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="origenDos" placeholder={fechaFiltrada ? fechaFiltrada?.origenDos : 'Origen'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Precio</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="precioDos" placeholder={fechaFiltrada ? fechaFiltrada?.precioDos : 'Precio'}></input>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleThree" placeholder={fechaFiltrada ? fechaFiltrada?.sampleThree : "Nombre/Marca Muestra 3"}></input>
                        <div className='d-flex flex-row mt-1'>
                          <div className='d-flex flex-row mt-1'>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Muestra</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="letraMuestra3" placeholder={fechaFiltrada?.letraMuestra3 === '' ? 'Muestra' : fechaFiltrada?.letraMuestra3}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Bodega</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="bodegaTres" placeholder={fechaFiltrada ? fechaFiltrada?.bodegaTres : 'Bodega'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Origen</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="origenTres" placeholder={fechaFiltrada ? fechaFiltrada?.origenTres : 'Origen'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Precio</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="precioTres" placeholder={fechaFiltrada ? fechaFiltrada?.precioTres : 'Precio'}></input>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleFour" placeholder={fechaFiltrada ? fechaFiltrada?.sampleFour : "Nombre/Marca Muestra 4"}></input>
                        <div className='d-flex flex-row mt-1'>
                          <div className='d-flex flex-row mt-1'>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Muestra</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="letraMuestra4" placeholder={fechaFiltrada?.letraMuestra4 === '' ? 'Muestra' : fechaFiltrada?.letraMuestra4}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Bodega</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="bodegaCuatro" placeholder={fechaFiltrada ? fechaFiltrada?.bodegaCuatro : 'Bodega'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Origen</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="origenCuatro" placeholder={fechaFiltrada ? fechaFiltrada?.origenCuatro : 'Origen'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Precio</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="precioCuatro" placeholder={fechaFiltrada ? fechaFiltrada?.precioCuatro : 'Precio'}></input>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleFive" placeholder={fechaFiltrada ? fechaFiltrada?.sampleFive : "Nombre/Marca Muestra 5"}></input>
                        <div className='d-flex flex-row mt-1'>
                          <div className='d-flex flex-row mt-1'>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Muestra</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="letraMuestra5" placeholder={fechaFiltrada?.letraMuestra5 === '' ? 'Muestra' : fechaFiltrada?.letraMuestra5}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Bodega</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="bodegaCinco" placeholder={fechaFiltrada ? fechaFiltrada?.bodegaCinco : 'Bodega'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Origen</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="origenCinco" placeholder={fechaFiltrada ? fechaFiltrada?.origenCinco : 'Origen'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Precio</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="precioCinco" placeholder={fechaFiltrada ? fechaFiltrada?.precioCinco : 'Precio'}></input>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" style={{backgroundColor: '#F8EEE7'}} onChange={handleInputChange} name="sampleSix" placeholder={fechaFiltrada ? fechaFiltrada?.sampleSix : "Nombre/Marca Muestra 6"}></input>
                        <div className='d-flex flex-row mt-1'>
                          <div className='d-flex flex-row mt-1'>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Muestra</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="letraMuestra6" placeholder={fechaFiltrada?.letraMuestra6 === '' ? 'Muestra' : fechaFiltrada?.letraMuestra6}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Bodega</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="bodegaSeis" placeholder={fechaFiltrada ? fechaFiltrada?.bodegaSeis : 'Bodega'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Origen</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="origenSeis" placeholder={fechaFiltrada ? fechaFiltrada?.origenSeis : 'Origen'}></input>
                            </div>
                            <div className='d-flex flex-column'>
                              <label style={{fontSize: 12}}>Precio</label>
                              <input type="text" className="form-control" onChange={handleInputChange} name="precioSeis" placeholder={fechaFiltrada ? fechaFiltrada?.precioSeis : 'Precio'}></input>
                            </div>
                          </div>
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
                          <p>Editar Evento</p>
                        }
                      </button>
                    </div>
                </form>
                  
                </div>
                : 
                <div className='alert alert-danger'>
                  No hay eventos disponibles.
                </div>
          }
                <DialogActions>
                </DialogActions>
              </Dialog>
        </CardActions>
    </Card>
  );
}
