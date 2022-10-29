import * as React from "react";
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import firebaseApp from "../../firebase/credenciales";
import ojo from '../../assets/images/icon-png/ojo.png'
import nariz from '../../assets/images/icon-png/nariz.png'
import boca from '../../assets/images/icon-png/boca.png'
import equilibrio from '../../assets/images/icon-png/equi.png'
import podio from '../../assets/images/icon-png/podio.png'
import { format } from "date-fns";


export default function TableFiveInput({dateToday, user}) {
  const [msgerror, setMsgerror] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [mostrarMensaje, setMostrarMensaje] = React.useState(false)
  let now = new Date().toLocaleDateString()
  const resData = dateToday?.filter(item => item.dateEvent === now)
  const firestore = getFirestore(firebaseApp);
  
  const [puntajeTotalOne, setPuntajeTotalOne] = React.useState({
    totalOne: 0,
  })
  const [puntajeTotalTwo, setPuntajeTotalTwo] = React.useState({
    totalTwo: 0,
  })
  const [puntajeTotalThree, setPuntajeTotalThree] = React.useState({
    totalThree: 0,
  })
  const [puntajeTotalFour, setPuntajeTotalFour] = React.useState({
    totalFour: 0,
  })
  const [puntajeTotalFive, setPuntajeTotalFive] = React.useState({
    totalFive: 0,
  })

  const [positionA, setPositionA] = React.useState(0)
  const [positionB, setPositionB] = React.useState(0)
  const [positionC, setPositionC] = React.useState(0)
  const [positionD, setPositionD] = React.useState(0)
  const [positionE, setPositionE] = React.useState(0)
  
  
  const [inputSample, setInputSample] = React.useState({
    sampleOneVista: '',
    sampleOneNariz: '',
    sampleOneBoca: '',
    sampleOneEquil: '',

    sampleTwoVista: '',
    sampleTwoNariz: '',
    sampleTwoBoca: '',
    sampleTwoEquil: '',

    sampleThreeVista: '',
    sampleThreeNariz: '',
    sampleThreeBoca: '',
    sampleThreeEquil: '',

    sampleFourVista: '',
    sampleFourNariz: '',
    sampleFourBoca: '',
    sampleFourEquil: '',

    sampleFiveVista: '',
    sampleFiveNariz: '',
    sampleFiveBoca: '',
    sampleFiveEquil: '',
  })
  
React.useEffect(() => {
  const puntajeSampleOne = (Number(inputSample.sampleOneVista) + Number(inputSample.sampleOneNariz)*3
  + Number(inputSample.sampleOneBoca)*4 + Number(inputSample.sampleOneEquil)*2)

  const puntajeSampleTwo = (Number(inputSample.sampleTwoVista) + Number(inputSample.sampleTwoNariz)*3
  + Number(inputSample.sampleTwoBoca)*4 + Number(inputSample.sampleTwoEquil)*2)

  const puntajeSampleThree = (Number(inputSample.sampleThreeVista) + Number(inputSample.sampleThreeNariz)*3
  + Number(inputSample.sampleThreeBoca)*4 + Number(inputSample.sampleThreeEquil)*2)

  const puntajeSampleFour = (Number(inputSample.sampleFourVista) + Number(inputSample.sampleFourNariz)*3
  + Number(inputSample.sampleFourBoca)*4 + Number(inputSample.sampleFourEquil)*2)

  const puntajeSampleFive = (Number(inputSample.sampleFiveVista) + Number(inputSample.sampleFiveNariz)*3
  + Number(inputSample.sampleFiveBoca)*4 + Number(inputSample.sampleFiveEquil)*2)



  setPuntajeTotalOne({totalOne: puntajeSampleOne})
  setPuntajeTotalTwo({totalTwo: puntajeSampleTwo})
  setPuntajeTotalThree({totalThree: puntajeSampleThree})
  setPuntajeTotalFour({totalFour: puntajeSampleFour})
  setPuntajeTotalFive({totalFive: puntajeSampleFive})
}, [inputSample])

const handleInputChange = (event) => {
    setInputSample({
        ...inputSample,
        [event.target.name] : event.target.value
        
    })
}

const dataSend = {
  muestraNameA : resData[0].sampleOne,
  bodegaA : resData[0].bodegaUno,
  origenA : resData[0].origenUno,
  precioA : resData[0].precioUno,
  muestraPositionA : positionA,
  muestraNameB : resData[0].sampleTwo,
  bodegaB : resData[0].bodegaDos,
  origenB : resData[0].origenDos,
  precioB : resData[0].precioDos,
  muestraPositionB : positionB,
  muestraNameC : resData[0].sampleThree,
  bodegaC : resData[0].bodegaTres,
  origenC : resData[0].origenTres,
  precioC : resData[0].precioTres,
  muestraPositionC : positionC,
  muestraNameD : resData[0].sampleFour,
  bodegaD : resData[0].bodegaCuatro,
  origenD : resData[0].origenCuatro,
  precioD : resData[0].precioCuatro,
  muestraPositionD : positionD,
  muestraNameE : resData[0].sampleFive,
  bodegaE : resData[0].bodegaCinco,
  origenE : resData[0].origenCinco,
  precioE : resData[0].precioCinco,
  muestraPositionE : positionE,
  fecha : format(new Date(), 'yyyy/MM/dd'),
  nombre : user?.nombre,
  numeroEvento: resData[0]?.eventNumber
}

const addPunctuation = async () => {
  setLoading(true)
  const docRef = doc(firestore, `puntos/${user.uid}`);
  if (
      inputSample.sampleOneBoca !== '' && inputSample.sampleOneNariz !== '' && inputSample.sampleOneVista !== '' &&
      inputSample.sampleOneEquil !== '' && inputSample.sampleTwoBoca !== '' && inputSample.sampleTwoNariz !== '' && 
      inputSample.sampleTwoVista !== '' && inputSample.sampleTwoEquil !== '' && inputSample.sampleThreeBoca !== '' &&
      inputSample.sampleThreeNariz !== '' && inputSample.sampleThreeVista !== '' && inputSample.sampleThreeEquil !== '' &&
      inputSample.sampleFourBoca !== '' && inputSample.sampleFourNariz !== '' && inputSample.sampleFourVista !== '' && 
      inputSample.sampleFourEquil !== '' && inputSample.sampleFiveBoca !== ''&& inputSample.sampleFiveNariz !== ''&& 
      inputSample.sampleFiveVista !== '' && inputSample.sampleFiveEquil !== ''
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

  const puntajeCalcular = [
    puntajeTotalOne.totalOne, 
    puntajeTotalTwo.totalTwo, 
    puntajeTotalThree.totalThree, 
    puntajeTotalFour.totalFour,
    puntajeTotalFive.totalFive
  ]
  
  React.useEffect(() => {    
    const calcularNumeros = (num) => {
      let puntajeOrdenado = puntajeCalcular.sort((a, b) => b - a )
      let posicion = puntajeOrdenado.findIndex((item) => num === item) + 1
      return posicion
    }
    
    setPositionA(calcularNumeros(puntajeTotalOne.totalOne));
    setPositionB(calcularNumeros(puntajeTotalTwo.totalTwo));
    setPositionC(calcularNumeros(puntajeTotalThree.totalThree));
    setPositionD(calcularNumeros(puntajeTotalFour.totalFour));
    setPositionE(calcularNumeros(puntajeTotalFive.totalFive));
  }, [puntajeTotalOne, puntajeTotalTwo, puntajeTotalThree, puntajeTotalFour, puntajeTotalFive, puntajeCalcular])

  return resData?.length ? (
    <>
    <h2 className="mb-3">DEGUSTACIÓN N°: {resData[0].eventNumber}</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">A</th>
          <th scope="col">B</th>
          <th scope="col">C</th>
          <th scope="col">D</th>
          <th scope="col">E</th>
        </tr>

      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <img src={ojo} alt="" className="" style={{ width: 25, height: 25 }}/>
          </th>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleOneVista" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleTwoVista" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleThreeVista" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFourVista" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFiveVista" onChange={handleInputChange}/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <div>
              <img src={nariz} alt="" style={{ width: 25, height: 25}}/>
            </div>
          </th>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleOneNariz" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleTwoNariz" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleThreeNariz" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFourNariz" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFiveNariz" onChange={handleInputChange}/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <img src={boca} alt="" className="" style={{ width: 30, height: 30 }}/>
          </th>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleOneBoca" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleTwoBoca" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleThreeBoca" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFourBoca" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFiveBoca" onChange={handleInputChange}/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <img src={equilibrio} alt="" className="" style={{ width: 25, height: 25 }}/>
          </th>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleOneEquil" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleTwoEquil" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleThreeEquil" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFourEquil" onChange={handleInputChange}/>
          </td>
          <td>
            <input type="number" required className="w-50 text-center" name="sampleFiveEquil" onChange={handleInputChange}/>
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
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20, color: '#C5BBCD' }}>{puntajeTotalThree.totalThree}</p>
          </td>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20, color: '#C5BBCD' }}>{puntajeTotalFour.totalFour}</p>
          </td>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20, color: '#C5BBCD' }}>{puntajeTotalFive.totalFive}</p>
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
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20 }}>{positionC}</p>
          </td>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20 }}>{positionD}</p>
          </td>
          <td>
            <p className="ms-3" style={{ fontWeight: 'bold', fontSize: 20 }}>{positionE}</p>
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
