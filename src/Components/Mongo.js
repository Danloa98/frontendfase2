import React, { useEffect, useRef, useState } from "react";
import { Contenedor } from "./NavBarElements";
import { Line,Bar, defaults } from "react-chartjs-2";
import Grafica from "./Grafica";

const baseUrl = "https://apirust4-4fgwmqspza-uc.a.run.app/get-all";

function Logs() {
  const [logs, setLogs] = useState([]);


  //-------REPORTE CANT DE INGRESOS POR COLA
  const rabitcount = useRef(0);
  const kafkacount = useRef(0);


  useEffect(() => {
    getOperations();
    rabitcount.current=0;
    kafkacount.current=0;

  }, [])

const contadorRabit=logs.map(({ game_id, players, game_name, winner,queue }, index) => {
      
  if(queue=="RabbitMQ"){
  rabitcount.current=rabitcount.current+1
  }else if (queue=="Kafka"){
    kafkacount.current=kafkacount.current+1
  }
  return (
    rabitcount.current
  );
})



  const getOperations = async() => {
    await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log("Holaaaaaaa")
      console.log(data)
      setLogs(data)
    }).catch(console.error)
  }

  console.log(logs)
  console.log("Cantidad de logs de RabbitMq",rabitcount.current)
  console.log("Cantidad de logs de Kafka",kafkacount.current)

  

  return (
    <div>
      <Contenedor >
        <h1>{}</h1>
    <table className="table" border="1">
      <thead>
        <tr>
          <th>No</th>
          <th>game ID</th>
          <th>players</th>
          <th>game name</th>
          <th>winner</th>
          <th>queue</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(({ game_id, players, game_name, winner,queue }, index) => {
          return (
            <tr>
              <td>
                <b>{index}</b>
              </td>
              <td>{game_id}</td>
              <td>{players}</td>
              <td>
                  {game_name}
              </td>
              <td>{winner}</td>
              <td>{queue}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </Contenedor>

    <Contenedor>

      <Grafica axis={["RabbitMq","Kafka"]} data={[rabitcount.current/2,kafkacount.current/2]} />
      <Grafica axis={["RabbitMq","Kafka"]} data={[rabitcount.current/2,kafkacount.current/2]} />


      </Contenedor>
    </div>
  );
}

export default Logs;