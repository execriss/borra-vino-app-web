import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import icon from "../assets/images/puntuarEvento.png";
import TableFourInput from "./tables/TableFourInput";
import 'firebase/firestore'
import firebaseApp from "../firebase/credenciales";
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import TableTwoInput from "./tables/TableTwoInput";
import TableThreeInput from "./tables/TableThreeInput";
import TableFiveInput from "./tables/TableFiveInput";
import TableSixInput from "./tables/TableSixInput";

export default function GoNewEvent({user}) {
  const [data, setData] = React.useState()
  let now = new Date().toLocaleDateString()
  const db = getFirestore(firebaseApp);

  async function getData(db) {
    const eventCol = collection(db, 'eventos');
    const eventSnapshot = await getDocs(eventCol);
    const eventList = eventSnapshot.docs.map(doc => doc.data());
    return eventList;
  }

  React.useEffect(() => {
    getData(db).then(res => setData(res.map(item => item.datos)));
  }, [db])

  const getTable = () => {
    const resData = data?.filter(item => item.dateEvent === now)
    if(resData?.length){
      if (resData[0]?.numberOfSample === "2") {
        return (<TableTwoInput dateToday={data} user={user}/>)
      }
      if (resData[0]?.numberOfSample === "3") {
        return (<TableThreeInput dateToday={data} user={user}/>)
      }
      if (resData[0]?.numberOfSample === "4") {
        return (<TableFourInput dateToday={data} user={user}/>)
      }
      if (resData[0]?.numberOfSample === "5") {
        return (<TableFiveInput dateToday={data} user={user}/>)
      }
      if (resData[0]?.numberOfSample === "6") {
        return (<TableSixInput dateToday={data} user={user}/>)
      }
    }
    else {
      return <p>No hay eventos disponibles para el dia de hoy.</p>
    }
  }

  
  return (
    <Card sx={{ maxWidth: 345, background: '#F4DECB', minHeight: 140, borderRadius: '20px'}}>
      <CardActionArea>
          <Typography variant="h5" component="div" sx={{ marginTop: '20px', color:'#49274A', fontFamily: 'sans-serif', fontWeight: 'bold', textAlign: 'center'}}>
            Puntuar Evento
          </Typography>
        <CardMedia
          component="img"
          height="220"
          image={icon}
          alt="Nuevo evento"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        />
      </CardActionArea>
      <CardActions>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Nuevo evento
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">{getTable()}</div>
                <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
