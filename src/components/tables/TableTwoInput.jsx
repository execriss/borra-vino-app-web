import * as React from "react";
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import firebaseApp from "../../firebase/credenciales";
import ojo from '../../assets/images/icon-png/ojo.png'
import nariz from '../../assets/images/icon-png/nariz.png'
import boca from '../../assets/images/icon-png/boca.png'
import equilibrio from '../../assets/images/icon-png/equi.png'
import podio from '../../assets/images/icon-png/podio.png'
import { format } from "date-fns";

export default function TableTwoInput({dateToday, user}) {
  const [positionA, setPositionA] = React.useState(0)
  const [positionB, setPositionB] = React.useState(0)
  const [msgerror, setMsgerror] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [mostrarMensaje, setMostrarMensaje] = React.useState(false)

  let now = new Date().toLocaleDateString()
  const firestore = getFirestore(firebaseApp);
  const resData = dateToday?.filter(item => item.dateEvent === now)

  const [puntajeTotalOne, setPuntajeTotalOne] = React.useState({
    totalOne: 0,
  })
  const [puntajeTotalTwo, setPuntajeTotalTwo] = React.useState({
    totalTwo: 0,
  })
  
  const [inputSample, setInputSample] = React.useState({
    sampleOneVista: '',
    sampleOneNariz: '',
    sampleOneBoca: '',
    sampleOneEquil: '',

    sampleTwoVista: '',
    sampleTwoNariz: '',
    sampleTwoBoca: '',
    sampleTwoEquil: '',
  })
  
React.useEffect(() => {
  const puntajeSampleOne = (Number(inputSample.sampleOneVista) + Number(inputSample.sampleOneNariz)*3
  + Number(inputSample.sampleOneBoca)*4 + Number(inputSample.sampleOneEquil)*2)

  const puntajeSampleTwo = (Number(inputSample.sampleTwoVista) + Number(inputSample.sampleTwoNariz)*3
  + Number(inputSample.sampleTwoBoca)*4 + Number(inputSample.sampleTwoEquil)*2)

  setPuntajeTotalOne({totalOne: puntajeSampleOne})
  setPuntajeTotalTwo({totalTwo: puntajeSampleTwo})
}, [inputSample])

const handleInputChange = (event) => {
    setInputSample({
        ...inputSample,
        [event.target.name] : event.target.value
        
    })
}

const addPunctuation = async () => {
  setLoading(true)
  const docRef = doc(firestore, `puntos/${user.uid}`);
  if (
    inputSample.sampleOneBoca !== '' && inputSample.sampleOneNariz !== '' && inputSample.sampleOneVista !== '' &&
    inputSample.sampleOneEquil !== '' && inputSample.sampleTwoBoca !== '' && inputSample.sampleTwoNariz !== '' && 
    inputSample.sampleTwoVista !== '' && inputSample.sampleTwoEquil !== '' 
    ) {
    setDoc(docRef, { dataSend })
    .then((res) => {
      setLoading(false)
      setMostrarMensaje(true)  
      setMsgerror(null)
    })
    .catch((err) => {
      setLoading(false)
      setMsgerror(err)
    })
  } else {
    setMsgerror('Todos los casilleros deben estar completos')
    setLoading(false)
  }
};

  const puntajeCalcular = [puntajeTotalOne.totalOne, puntajeTotalTwo.totalTwo]
  
  React.useEffect(() => {    
    const calcularNumeros = (num) => {
      let puntajeOrdenado = puntajeCalcular.sort((a, b) => b - a )
      let posicion = puntajeOrdenado.findIndex((item) => num === item) + 1
      return posicion
    }
    
    setPositionA(calcularNumeros(puntajeTotalOne.totalOne));
    setPositionB(calcularNumeros(puntajeTotalTwo.totalTwo));
  }, [puntajeTotalOne, puntajeTotalTwo, puntajeCalcular])

  const dataSend = {
    muestraNameA : resData[0].sampleOne,
    bodegaA : resData[0]?.bodegaUno,
    origenA : resData[0]?.origenUno,
    precioA : resData[0]?.precioUno,
    muestraPositionA : positionA,
    muestraNameB : resData[0]?.sampleTwo,
    bodegaB : resData[0]?.bodegaDos,
    origenB : resData[0]?.origenDos,
    precioB : resData[0]?.precioDos,
    muestraPositionB : positionB,
    fecha : format(new Date(), 'yyyy/MM/dd'),
    nombre : user?.nombre,
    numeroEvento: resData[0]?.eventNumber
  }

  return resData?.length ? (
    <>
    <h2 className="mb-3">DEGUSTACIÓN N°: {resData[0].eventNumber}</h2><table class="table">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">A</th>
          <th scope="col">B</th>
        </tr>

      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <img src={ojo} alt="" className="" style={{ width: 25, height: 25 }}/>
          </th>
          <td>
            <input type="number" required className="w-25 text-center" name="sampleOneVista" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-25 text-center" name="sampleTwoVista" onChange={handleInputChange}/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <div>
              <img src={nariz} alt="" style={{ width: 25, height: 25}}/>
            </div>
          </th>
          <td>
            <input type="number" required className="w-25 text-center" name="sampleOneNariz" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-25 text-center" name="sampleTwoNariz" onChange={handleInputChange}/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <img src={boca} alt="" className="" style={{ width: 30, height: 30 }}/>
          </th>
          <td>
            <input type="number" required className="w-25 text-center" name="sampleOneBoca" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-25 text-center" name="sampleTwoBoca" onChange={handleInputChange}/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <img src={equilibrio} alt="" className="" style={{ width: 25, height: 25 }}/>
          </th> 
          <td>
            <input type="number" required className="w-25 text-center" name="sampleOneEquil" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-25 text-center" name="sampleTwoEquil" onChange={handleInputChange}/>
          </td>
        </tr>
        <br /><br />
        <tr>
          <th scope="row"></th>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20, color: '#C5BBCD' }}>{puntajeTotalOne.totalOne}</p>
          </td>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20, color: '#C5BBCD' }}>{puntajeTotalTwo.totalTwo}</p>
          </td>
        </tr>
        <br />
        <tr>
          <th scope="row">
            <img src={podio} alt="" style={{ width: 25, height: 25}}/>
          </th>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20 }}>{positionA}</p>
          </td>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20 }}>{positionB}</p>
          </td>
        </tr>
      </tbody>
    </table>
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
              {
                mostrarMensaje ?
                  (
                    <div className='alert alert-success'>
                      ¡Tu voto fue enviado correctamente!
                    </div>
                  )
                  :
                  (
                    <span></span>
                  )
              }
    <div className="d-flex justify-content-between pt-3">
      <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
      >
          Cerrar
      </button>
      <button type="button" class="btn btn-primary" onClick={() => addPunctuation()}>
                {
                  loading ? 
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Cargando...</span>
                    </div> 
                  :
                  <p>ENVIAR</p>
                }
      </button>
    </div>
    </>
  ) : <p>No tienes eventos disponibles para el dia de hoy.</p>
}
