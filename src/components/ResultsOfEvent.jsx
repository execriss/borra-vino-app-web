import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import icon from "../assets/images/resultadoEvento.png";
import TableResult from "./TableResult";
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import firebaseApp from "../firebase/credenciales";

export default function ResultsOfEvent({user}) {
  const [data, setData] = React.useState()
  const db = getFirestore(firebaseApp);

  async function getData(db) {
    const eventCol = collection(db, 'puntos');
    const eventSnapshot = await getDocs(eventCol);
    const eventList = eventSnapshot.docs.map(doc => doc.data());
    return eventList;
  }

  React.useEffect(() => {
    getData(db).then(res => setData(res.map(item => item.dataSend)));
  }, [db])

  return (
    <Card sx={{ maxWidth: 345, background: '#F4DECB', minHeight: 140, borderRadius: '20px'}}>
      <CardActionArea>
          <Typography variant="h5" component="div" sx={{ marginTop: '20px', color:'#49274A', fontFamily: 'sans-serif', fontWeight: 'bold', textAlign: 'center'}}>
            Ver Resultados
          </Typography>
        <CardMedia
          component="img"
          height="220"
          image={icon}
          alt="Resultados"
          data-bs-toggle="modal"
          data-bs-target="#exampleModa2"
        />
      </CardActionArea>
      <CardActions>
        <div
          className="modal fade"
          id="exampleModa2"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>RESULTADOS</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body"><TableResult dataTotal={data} user={user}/></div>
            </div>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
