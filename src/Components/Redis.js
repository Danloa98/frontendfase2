import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";


import React from 'react'
import { Contenedor, ContenedorA,Nav2 } from "./NavBarElements";


function Redis() {
   const [games, setGames] = useState([]);
   const [players, setPlayers] = useState([]);

    const socket = useRef();
    const baseUrl = "http://localhost:5000";
    let aux;



    useEffect(() => {
        socket.current = io.connect("http://localhost:5000");
        console.log("Socket proc connected")
        const interval = setInterval(() => {
          //getInfo();
        }, 5000);
        socket.current.emit("tidb", "asd-prueba");
        socket.current.on("tidb", async (mensaje) => {
          console.log("Tidb");
            console.log(mensaje)
            llenar(mensaje)
        });

        socket.current.emit("tidb:top10", "asd-prueba");
        socket.current.on("tidb:top10", async (mensaje) => {
          console.log("TidbTOP10");
            console.log(mensaje)
            llenar2(mensaje)
        });
        console.log("sss")
    
        return () => {
          clearInterval(interval);
          console.log("Socket proc disconnected")
          socket.current.disconnect();
        };
      }, []);


      const getInfo = async () => {
        await fetch(`${baseUrl}`, {
          method: "GET",
        });
      };
    
      async function llenar(data) {
        console.log("Wenassssss");
        console.log(data);
        //console.log(data[0].vm)
        setGames((tot) => data.slice(-10));
        // setLista(oldArray => [...oldArray, data[data.length-1].process_list[data[data.length-1].process_list.length-1]])
      }


      async function llenar2(data) {
        console.log("Wenassssss");
        console.log(data);
        //console.log(data[0].vm)
        setPlayers((tot) => data);
        // setLista(oldArray => [...oldArray, data[data.length-1].process_list[data[data.length-1].process_list.length-1]])
      }
    
    

  return (
    <div>
              <ContenedorA >
                  <Nav2><h1 >ULTIMOS 10 JUEGOS</h1></Nav2>
    <table className="table" border="3">
      <thead>
        <tr>
          <th>No</th>
          <th>game ID</th>
          <th>players</th>
          <th>game name</th>
          <th>winner</th>         
        </tr>
      </thead>
      <tbody>
        {games.map(({ game_id, players, game_name, winner }, index) => {
          return (
            <tr>
              <td>
                <b>{index+1}</b>
              </td>
              <td>{game_id}</td>
              <td>{players}</td>
              <td>
                  {game_name}
              </td>
              <td>{winner}</td>
              
            </tr>
          );
        })}
      </tbody>
    </table>
    </ContenedorA>


    <ContenedorA >
                  <Nav2><h1 >TOP 10 JUGADORES</h1></Nav2>
    <table className="table" border="3">
      <thead>
        <tr>
          <th>No</th>
          <th>Jugador</th>
          <th>Victorias</th>        
        </tr>
      </thead>
      <tbody>
        {players.map(({ winner, victorias}, index) => {
          return (
            <tr>
              <td>
                <b>{index+1}</b>
              </td>
              <td>{winner}</td>
              <td>{victorias}</td>
              
            </tr>
          );
        })}
      </tbody>
    </table>
    </ContenedorA>



    


    </div>
  )
}

export default Redis