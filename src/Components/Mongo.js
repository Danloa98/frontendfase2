import React, { useEffect, useRef, useState } from "react";
import { Contenedor } from "./NavBarElements";
import { Line,Bar, defaults } from "react-chartjs-2";

const baseUrl = "http://localhost:4000/get-all";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [operaciones, setOperations] = useState([]);


  useEffect(() => {
    getOperations();
}, [])



  const getOperations = async() => {
    await fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => {
      setLogs(data)
    }).catch(console.error)
  }

  console.log(logs)
  

  return (
    <div>
      <Contenedor >
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
        <Bar
          data={{
            labels: [1,2,3],
            datasets: [
              {
                label: "VM1 %",
                data: [1,2,3],
                borderColor: "orange",
                borderWidth: 1,
              },
              {
                label: "VM2%",
                data: [1,3,5],
                borderColor: "red",
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </Contenedor>
    </div>
  );
}

export default Logs;