import * as React from "react";
import podio from '../assets/images/icon-png/podio.png'
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import firebaseApp from "../firebase/credenciales";
import { collection, getDocs, getFirestore} from 'firebase/firestore'


export default function TableResult({dataTotal}) {
  const db = getFirestore(firebaseApp);
  const [fechaFiltrada, setFechaFiltrada] = React.useState();
  const [totalMuestraA, setTotalMuestraA] = React.useState(null);
  const [totalMuestraB, setTotalMuestraB] = React.useState(null);
  const [totalMuestraC, setTotalMuestraC] = React.useState(null);
  const [totalMuestraD, setTotalMuestraD] = React.useState(null);
  const [totalMuestraE, setTotalMuestraE] = React.useState(null);
  const [totalMuestraF, setTotalMuestraF] = React.useState(null);

  const [positionA, setPositionA] = React.useState(0)
  const [positionB, setPositionB] = React.useState(0)
  const [positionC, setPositionC] = React.useState(0)
  const [positionD, setPositionD] = React.useState(0)
  const [positionE, setPositionE] = React.useState(0)
  const [positionF, setPositionF] = React.useState(0)

  const [activePuntos, setActivePuntos] = React.useState()
  const [activeMuestras, setActiveMuestras] = React.useState()
  const [letraMuestra, setLetraMuestra] = React.useState()
  const [ultimoEvento, setUltimoEvento] = React.useState()

  async function getDataLetra(db) {
    const eventCol = collection(db, 'eventos');
    const eventSnapshot = await getDocs(eventCol);
    const eventList = eventSnapshot.docs.map(doc => doc.data());
    return eventList;
  }

  React.useEffect(() => {
    getDataLetra(db).then(res => {
      setLetraMuestra(res.map(item => item.datos))
    })
  }, [db])

  React.useEffect(() => {
    let fecha = [];
    let fechaFiltrada;
    if (letraMuestra) {
      letraMuestra?.map((item) => fecha?.push(item?.dateEvent))
      fecha?.sort()
      fechaFiltrada = letraMuestra?.filter((item) => item?.dateEvent === fecha.at(-1))
      setUltimoEvento(fechaFiltrada[0])
    }
  }, [letraMuestra])

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
      setActiveMuestras(res[0]?.active)
    });

    getDataPuntos(db).then(res => {
      setActivePuntos(res[0]?.active)
    });
  }, [db])

  React.useEffect(() => {
    let fecha = [];
    let fechaFiltrada = [];
    if (dataTotal) {
      dataTotal?.map((item) => fecha?.push(item?.fecha))
      fecha?.sort()
      fechaFiltrada = dataTotal?.filter((item) => item?.fecha === fecha.at(-1))
      setFechaFiltrada(fechaFiltrada)
    }
  }, [dataTotal])

  React.useEffect(() => {
    if (fechaFiltrada && fechaFiltrada[0]?.muestraPositionA) {
      let totalA;
      totalA = fechaFiltrada?.reduce((acc, curr) => acc + curr?.muestraPositionA, 0)
      setTotalMuestraA(totalA)
      let totalB;
      totalB = fechaFiltrada?.reduce((acc, curr) => acc + curr?.muestraPositionB, 0)
      setTotalMuestraB(totalB)
      let totalC;
      totalC = fechaFiltrada?.reduce((acc, curr) => acc + curr?.muestraPositionC, 0)
      setTotalMuestraC(totalC)
      let totalD;
      totalD = fechaFiltrada?.reduce((acc, curr) => acc + curr?.muestraPositionD, 0)
      setTotalMuestraD(totalD)
      let totalE;
      totalE = fechaFiltrada?.reduce((acc, curr) => acc + curr?.muestraPositionE, 0)
      setTotalMuestraE(totalE)
      let totalF;
      totalF = fechaFiltrada?.reduce((acc, curr) => acc + curr?.muestraPositionF, 0)
      setTotalMuestraF(totalF)
    }
  }, [fechaFiltrada])

  const puntajeCalcular = [
    totalMuestraA, totalMuestraB, totalMuestraC, totalMuestraD, totalMuestraE, totalMuestraF
  ]

  React.useEffect(() => {    
    const calcularNumeros = (num) => {
      let puntajeOrdenado = puntajeCalcular.sort((a, b) => a - b )
      let posicion = puntajeOrdenado.findIndex((item) => num === item) + 1
      return posicion
    }
    
    setPositionA(calcularNumeros(totalMuestraA));
    setPositionB(calcularNumeros(totalMuestraB));
    setPositionC(calcularNumeros(totalMuestraC));
    setPositionD(calcularNumeros(totalMuestraD));
    setPositionE(calcularNumeros(totalMuestraE));
    setPositionF(calcularNumeros(totalMuestraF));
  }, [totalMuestraA, totalMuestraB, totalMuestraC, totalMuestraD, totalMuestraE, totalMuestraF, puntajeCalcular])
  
  const calcularCriterioA = (number) => {
    let criterioA = 0;
    fechaFiltrada?.map((item) => item?.muestraPositionA === number ? criterioA++ : null)
    return <p className={`${criterioA !== 0 && 'fw-bolder'}`}>{criterioA}</p>
  }
  const calcularCriterioB = (number) => {
    let criterioB = 0;
    fechaFiltrada?.map((item) => item?.muestraPositionB === number ? criterioB++ : null)
    return <p className={`${criterioB !== 0 && 'fw-bolder'}`}>{criterioB}</p>
  }
  const calcularCriterioC = (number) => {
    let criterioC = 0;
    fechaFiltrada?.map((item) => item?.muestraPositionC === number ? criterioC++ : null)
    return <p className={`${criterioC !== 0 && 'fw-bolder'}`}>{criterioC}</p>
  }
  const calcularCriterioD = (number) => {
    let criterioD = 0;
    fechaFiltrada?.map((item) => item?.muestraPositionD === number ? criterioD++ : null)
    return <p className={`${criterioD !== 0 && 'fw-bolder'}`}>{criterioD}</p>
  }
  const calcularCriterioE = (number) => {
    let criterioE = 0;
    fechaFiltrada?.map((item) => item?.muestraPositionE === number ? criterioE++ : null)
    return <p className={`${criterioE !== 0 && 'fw-bolder'}`}>{criterioE}</p>
  }
  const calcularCriterioF = (number) => {
    let criterioF = 0;
    fechaFiltrada?.map((item) => item?.muestraPositionF === number ? criterioF++ : null)
    return <p className={`${criterioF !== 0 && 'fw-bolder'}`}>{criterioF}</p>
  }

  console.log('ultimo eventio', ultimoEvento);

  return (
    <>
      <h5 className="modal-title mb-3 d-flex flex-row" id="exampleModalLabel">
        Fecha del Evento: <p className='fw-bold ms-2'>{fechaFiltrada ? fechaFiltrada[0]?.fecha : null}</p>
      </h5>
      <h5 className="modal-title mb-3 d-flex flex-row" id="exampleModalLabel">
        Evento N°: <p className='fw-bold ms-2'>{fechaFiltrada ? fechaFiltrada[0]?.numeroEvento : null}</p>
      </h5>
        {activePuntos ? 
        <table className="table table-hover" id="tableResult">
        <thead>
          <tr>
            <th scope="col"></th>
            {fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraPositionA') ? <th scope="col">A</th> : null}
            {fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraPositionB') ? <th scope="col">B</th> : null}
            {fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraPositionC') ? <th scope="col">C</th> : null}
            {fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraPositionD') ? <th scope="col">D</th> : null}
            {fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraPositionE') ? <th scope="col">E</th> : null}
            {fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraPositionF') ? <th scope="col">F</th> : null}
          </tr>
        </thead>
        <tbody>
          {fechaFiltrada?.map((user) => (
            <tr>
              <th scope="row">{user?.nombre}</th>
              <td>
                {user?.muestraPositionA ? user?.muestraPositionA : null}
              </td>
              <td>
                {user?.muestraPositionB ? user?.muestraPositionB : null}
              </td>
              <td>
                {user?.muestraPositionC ? user?.muestraPositionC : null}
              </td>
              <td>
                {user?.muestraPositionD ? user?.muestraPositionD : null} 
              </td>
              <td>
                {user?.muestraPositionE ? user?.muestraPositionE : null} 
              </td>
              <td>
                {user?.muestraPositionF ? user?.muestraPositionF : null} 
              </td>
            </tr>
          ))}
            <tr>
              <th scope="row">TOTAL</th>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{!isNaN(totalMuestraA) ? totalMuestraA : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{!isNaN(totalMuestraB) ? totalMuestraB : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{!isNaN(totalMuestraC) ? totalMuestraC : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{!isNaN(totalMuestraD) ? totalMuestraD : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{!isNaN(totalMuestraE) ? totalMuestraE : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{!isNaN(totalMuestraF) ? totalMuestraF : null}</p>
              </td>
            </tr>
            <br />
            <tr className="table table-active">
              <th scope="row">
                <img src={podio} alt="" style={{ width: 25, height: 25}}/>
              </th>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20 }}>{(!isNaN(positionA) && positionA !== 0) ? positionA : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20 }}>{(!isNaN(positionB) && positionB !== 0) ? positionB : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20 }}>{(!isNaN(positionC) && positionC !== 0) ? positionC : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20 }}>{(!isNaN(positionD) && positionD !== 0) ? positionD : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20 }}>{(!isNaN(positionE) && positionE !== 0) ? positionE : null}</p>
              </td>
              <td>
                <p className="" style={{ fontWeight: 'bold', fontSize: 20 }}>{(!isNaN(positionF) && positionF !== 0) ? positionF : null}</p>
              </td>
            </tr>
            <br />
            <br />

            { fechaFiltrada?.length ? fechaFiltrada[0]?.muestraPositionA ?
              <tr style={{ background: '#F8EEE7' }}>
                <th scope="row" className="">Criterio 1</th>
                <td>
                  {calcularCriterioA(1)}
                </td>
                <td>
                  {calcularCriterioB(1)}
                </td>
                <td>
                  {calcularCriterioC(1)}
                </td>
                <td>
                  {calcularCriterioD(1)}
                </td>
                <td>
                  {calcularCriterioE(1)}
                </td>
                <td>
                  {calcularCriterioF(1)}
                </td>
              </tr>
            : null
           : null }

            { fechaFiltrada?.length ? fechaFiltrada[0]?.muestraPositionB ?
              <tr style={{ background: '#F4DECB' }}>
                <th scope="row" className="">Criterio 2</th>
                <td>
                  {calcularCriterioA(2)}
                </td>
                <td>
                  {calcularCriterioB(2)}
                </td>
                <td>
                  {calcularCriterioC(2)}
                </td>
                <td>
                  {calcularCriterioD(2)}
                </td>
                <td>
                  {calcularCriterioE(2)}
                </td>
                <td>
                  {calcularCriterioF(2)}
                </td>
              </tr>
            : null
            : null }

            { fechaFiltrada?.length ? fechaFiltrada[0]?.muestraPositionC ?
              <tr style={{ background: '#F8EEE7' }}>
                <th scope="row" className="">Criterio 3</th>
                <td>
                  {calcularCriterioA(3)}
                </td>
                <td>
                  {calcularCriterioB(3)}
                </td>
                <td>
                  {calcularCriterioC(3)}
                </td>
                <td>
                  {calcularCriterioD(3)}
                </td>
                <td>
                  {calcularCriterioE(3)}
                </td>
                <td>
                  {calcularCriterioF(3)}
                </td>
              </tr>
            : null
           : null }

            { fechaFiltrada?.length ? fechaFiltrada[0]?.muestraPositionD ?
              <tr style={{ background: '#F4DECB' }}>
                <th scope="row" className="">Criterio 4</th>
                <td>
                  {calcularCriterioA(4)}
                </td>
                <td>
                  {calcularCriterioB(4)}
                </td>
                <td>
                  {calcularCriterioC(4)}
                </td>
                <td>
                  {calcularCriterioD(4)}
                </td>
                <td>
                  {calcularCriterioE(4)}
                </td>
                <td>
                  {calcularCriterioF(4)}
                </td>
              </tr>
            : null
            : null }

            { fechaFiltrada?.length ? fechaFiltrada[0]?.muestraPositionE ?
              <tr style={{ background: '#F8EEE7' }}>
                <th scope="row" className="">Criterio 5</th>
                <td>
                  {calcularCriterioA(5)}
                </td>
                <td>
                  {calcularCriterioB(5)}
                </td>
                <td>
                  {calcularCriterioC(5)}
                </td>
                <td>
                  {calcularCriterioD(5)}
                </td>
                <td>
                  {calcularCriterioE(5)}
                </td>
                <td>
                  {calcularCriterioF(5)}
                </td>
              </tr>
            : null
           : null }

            { fechaFiltrada?.length ? fechaFiltrada[0]?.muestraPositionF ?
              <tr style={{ background: '#F8EEE7' }}>
                <th scope="row" className="">Criterio 6</th>
                <td>
                  {calcularCriterioA(6)}
                </td>
                <td>
                  {calcularCriterioB(6)}
                </td>
                <td>
                  {calcularCriterioC(6)}
                </td>
                <td>
                  {calcularCriterioD(6)}
                </td>
                <td>
                  {calcularCriterioE(6)}
                </td>
                <td>
                  {calcularCriterioF(6)}
                </td>
              </tr>
            : null
           : null }
            <br />
            <br />
            {activeMuestras ? 
            <>
            <tr style={{ background: '#F4DECB' }}>
                <th scope="row" className=""> </th>
                <td colSpan={2} className="fw-bold">
                  <p>BODEGA</p>
                </td>
                <td colSpan={2} className="fw-bold">
                  <p>PRECIO</p>
                </td>
                <td colSpan={2} className="fw-bold">
                  <p>ORIGEN</p>
                </td>
              </tr><tr style={{ background: '#F4DECB' }}>
                  <th scope="row" className="">{fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraNameA') ? 
                    <p>{ultimoEvento?.letraMuestra1 ? ultimoEvento?.letraMuestra1 : null} -{ultimoEvento?.sampleOne ? ultimoEvento?.sampleOne : null}</p> 
                  : null}</th>
                  <td colSpan={2}>
                    {ultimoEvento?.bodegaUno ? ultimoEvento?.bodegaUno : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.precioUno ? ultimoEvento?.precioUno : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.origenUno ? ultimoEvento?.origenUno : null}
                  </td>
                </tr><tr style={{ background: '#F4DECB' }}>
                  <th scope="row" className="">{fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraNameB') ? 
                    <p>{ultimoEvento?.letraMuestra2 ? ultimoEvento?.letraMuestra2 : null} -{ultimoEvento?.sampleTwo ? ultimoEvento?.sampleTwo : null}</p> 
                  : null}</th>
                  <td colSpan={2}>
                    {ultimoEvento?.bodegaDos ? ultimoEvento?.bodegaDos : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.precioDos ? ultimoEvento?.precioDos : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.origenDos ? ultimoEvento?.origenDos : null}
                  </td>
                </tr><tr style={{ background: '#F4DECB' }}>
                  <th scope="row" className="">{fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraNameC') ? 
                    <p>{ultimoEvento?.letraMuestra3 ? ultimoEvento?.letraMuestra3 : null} -{ultimoEvento?.sampleThree ? ultimoEvento?.sampleThree : null}</p> 
                  : null}</th>
                  <td colSpan={2}>
                    {ultimoEvento?.bodegaTres ? ultimoEvento?.bodegaTres : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.precioTres ? ultimoEvento?.precioTres : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.origenTres ? ultimoEvento?.origenTres : null}
                  </td>
                </tr>
                <tr style={{ background: '#F4DECB' }}>
                  <th scope="row" className="">{fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraNameD') ? 
                    <p>{ultimoEvento?.letraMuestra4 ? ultimoEvento?.letraMuestra4 : null} -{ultimoEvento?.sampleFour ? ultimoEvento?.sampleFour : null}</p> 
                  : null}</th>
                  <td colSpan={2}>
                    {ultimoEvento?.bodegaCuatro ? ultimoEvento?.bodegaCuatro : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.precioCuatro ? ultimoEvento?.precioCuatro : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.origenCuatro ? ultimoEvento?.origenCuatro : null}
                  </td>
                </tr>
                <tr style={{ background: '#F4DECB' }}>
                  <th scope="row" className="">{fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraNameD') ? 
                      <p>{ultimoEvento?.letraMuestra5 ? ultimoEvento?.letraMuestra5 : null} -{ultimoEvento?.sampleFive ? ultimoEvento?.sampleFive : null}</p> 
                  : null}</th>
                  <td colSpan={2}>
                    {ultimoEvento?.bodegaCinco ? ultimoEvento?.bodegaCinco : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.precioCinco ? ultimoEvento?.precioCinco : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.origenCinco ? ultimoEvento?.origenCinco : null}
                  </td>
                </tr>
                <tr style={{ background: '#F4DECB' }}>
                  <th scope="row" className="">{fechaFiltrada && Object?.keys(fechaFiltrada[0])?.includes('muestraNameD') ? 
                      <p>{ultimoEvento?.letraMuestra6 ? ultimoEvento?.letraMuestra6 : null} -{ultimoEvento?.sampleSix ? ultimoEvento?.sampleSix : null}</p> 
                  : null}</th>
                  <td colSpan={2}>
                    {ultimoEvento?.bodegaSeis ? ultimoEvento?.bodegaSeis : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.precioSeis ? ultimoEvento?.precioSeis : null}
                  </td>
                  <td colSpan={2}>
                    {ultimoEvento?.origenSeis ? ultimoEvento?.origenSeis : null}
                  </td>
                </tr>
              </> : null}
        </tbody>
        </table> 
        : <div className='alert alert-danger'>
            Los resultados aún no estan disponibles. Espera a que el administrador los habilite.
          </div>
        }
        <div className="mt-5 d-flex flex-row justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <ReactHtmlTableToExcel 
            id="botonExportarExcel"
            className= "btn btn-success"
            table="tableResult"
            filename={`Degustación N ${fechaFiltrada ? fechaFiltrada[0]?.numeroEvento : null}`}
            sheet="tablexls"
            buttonText="Descargar Excel"
            
          />
        </div>
      </>
  );
}
