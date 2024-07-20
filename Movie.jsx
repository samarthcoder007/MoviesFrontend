import { useState } from "react"
import { Request } from "./Request.jsx"
import axios from "axios"
import React from "react"
import "./index.css"

export function Movie(){
    const [myData,setMyData] = useState([])

    const getmoviesAll = async () => {
        try{
        const res = await axios.get("https://moviesapi-hs5b.onrender.com/movie/")
        setMyData(res.data)
        }catch(err){
            console.log(err.message)
        }
    }
    
    const getmoviesOne = async (name) => {
        try{
        const res = await axios.get(`https://moviesapi-hs5b.onrender.com/movie/${name}`)
        setMyData([res.data])
        }catch(err){
            console.log(err.message)
        }
    }
    
    const deletemovie = async (name) => {
        try{
        const res = await axios.delete(`https://moviesapi-hs5b.onrender.com/movie/${name}`)
        setMyData(currentmyData => {
            return currentmyData.filter(movie => movie.name !== res.data.name)
        })
        }catch(err){
            console.log(err.message)
        }
    }
    
    const post = async (mov) => {
        try{
       const res = await axios.post("https://moviesapi-hs5b.onrender.com/movie/",{
            name: mov.name,
            yearOfRelease: mov.yearOfRelease,
            genre: mov.genre,
            leadMaleActor: mov.leadMaleActor,
            leadFemaleActor: mov.leadFemaleActor
        })
        setMyData(currentmyData => {
            return [...currentmyData,res.data]
        })
        }catch(err){
            return console.log(err.message)
        }
    }

    return (<>
         <Request post={post} deletemovie={deletemovie} getmoviesOne={getmoviesOne} getmoviesAll={getmoviesAll}/>
        <div className="superCard">
           {myData.map(movie => {
              return (
                 <div key={movie.id} className="card">
                    <h1>Movie's name: {movie.name}</h1>
                    <h2>Movie's year of release: {movie.yearOfRelease}</h2>
                    <h2>Genre: {movie.genre}</h2>
                    <h2>Lead Male Actor: {movie.leadMaleActor}</h2>
                    <h2>Lead Female Actor: {movie.leadFemaleActor}</h2>
                 </div>
              )
           })}
        </div>
      </>
     )
}

