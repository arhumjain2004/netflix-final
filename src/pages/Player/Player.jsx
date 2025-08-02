import React, { useEffect, useState } from 'react'
import './Player.css'
import arrow from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {


  const {id} = useParams();
  const navigate = useNavigate();
  const[apiData,setApiData]=useState({
  name:"",
  key:"",
  published_at:"",
  typeof:"",
})




const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDY1ZmFlOTZkNzdhODZiZTU5YmMzNTYyMmNkN2U0MCIsIm5iZiI6MTc1NDAxNzE1OC44NjIwMDAyLCJzdWIiOiI2ODhjMmQ4NjRkZmExNGM2Y2IyNjBlMTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5Mf37yJ19D5s6ehQm_gxO0Y_9vmSTUaGl-Bj7COUHGQ'
  }
};

useEffect(()=>{
    
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])




  return (
    <div className='Player'>
      <img src={arrow} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width='90%'height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}  title='trailer' frameBorder='0' allowFullScreenllow></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
        
        </div>      
    </div>
  )
}

export default Player
